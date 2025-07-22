import AIAgent from "../classes/Agent"

const agent = new AIAgent()

type ReqProps = {
  name: string
  lang?: string
  type : 'visit' | 'use' | 'guide'
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ReqProps>(event)

  const lang = body.lang || "en"
  let response: string = ""
  
  switch (body.type) {
    case 'visit':
      response = await agent.visit(body.name, lang)
      break
    case 'use':
      response = await agent.use(body.name, lang)
      break
    case 'guide':
      response = await agent.guide(body.name, lang)
      break
  }

  return response
})