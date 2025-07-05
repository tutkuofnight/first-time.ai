import axios from "axios"

const config = useRuntimeConfig()

class AIAgent {
  private apiKey: string;
  private baseUrl = config.apiUrl;
  private model = config.modelName;

  constructor() {
    this.apiKey = config.apiSecretKey || '';
    if (!this.apiKey) {
      throw new Error('OPENROUTER_API_KEY gerekli!');
    }
  }

  async visit(message: string, lang: string): Promise<string> {
    const question = `I am gonna visit ${message} first time. Answer as ${lang}.\m`
    try {
      const response = await axios.post(this.baseUrl, {
        model: this.model,
        messages: [
          { role: 'user', content: question + config.visitRules}
        ],
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      return 'Hata: AI servisi yanıt veremedi';
    }
  }
}

const agent = new AIAgent()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const response = await agent.visit(body.name, 'tr-TR');
  return response
})