import axios from "axios"
import { supabase } from "@/utils/supabase"

const config = useRuntimeConfig()

class AIAgent {
  private apiKey: string
  private baseUrl = config.apiUrl
  private model = config.modelName

  constructor() {
    this.apiKey = config.apiSecretKey || ''
    if (!this.apiKey) {
      throw new Error('OPENROUTER_API_KEY gerekli!')
    }
  }

  private async repository(question: string): Promise<{data: string | null, error: string | null}> {
    try {
      const response = await axios.post(this.baseUrl, {
        model: this.model,
        messages: [
          { role: 'user', content: question}
        ],
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      return { data: response.data.choices[0].message.content, error: null }
    } catch (error) {
      return { data: null, error: "Agent cannot response: " + error }
    }
  }

  async visit(message: string, lang: string): Promise<string> {
    const question = `I am gonna visit ${message} first time. Answer as ${lang}.\m ${config.visitRules}`
    const { data, error } = await this.repository(question)
    
    if (error) {
      return error
    }
    
    const { error: dbError } = await supabase
      .from('questions')
      .insert([
        { question: question, answer: data },
      ])

    if (dbError) {
      console.log(dbError)
    }

    return data!
  }

  async use(message: string, lang: string): Promise<string> {
    const question = `I am gonna use ${message} first time. Answer as ${lang}.\n`
    const { data, error } = await this.repository(question)

    if (error) {
      return error
    }
    return data!
  }
}

export default AIAgent