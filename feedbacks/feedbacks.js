
const consts = require('../consts/consts')

const chatGptService = require('../chat/chatGptService')


const time = require('../utils/converTime')

async function getFeedbackMessage(jsonData) {

    let formattedDate = time.epochToDate(jsonData.date)

    let msg = ''

    let chatGptFeedbackMessage = await chatGptService.getFeedbackMessage(jsonData.message)

    switch(jsonData.category){
        case consts.categories.FOOD:  
            msg = `

*${chatGptFeedbackMessage}* 

Categoria: ${consts.categoriesPTBR.FOOD}
${jsonData.date ? `Horário: ${formattedDate}`:``}
${jsonData.items?.length > 0 ? `Itens: ${jsonData.items.join(", ")}`:``}
            `
            break;

        case consts.categories.MEDICINE:
            msg = `

*${chatGptFeedbackMessage}*

Categoria: ${consts.categoriesPTBR.MEDICINE}
${jsonData.date ? `Horário: ${formattedDate}`:``}
${jsonData.name ? `Nome: ${jsonData.name}`:``}
${jsonData.quantity ? `Quantidade: ${jsonData.quantity} unidades`:``}
            `
            break;

        case consts.categories.EXERCISE:
            msg = `

*${chatGptFeedbackMessage}* 

Categoria: ${consts.categoriesPTBR.EXERCISE}
${jsonData.date ? `Horário: ${formattedDate}`:``}
${jsonData.name ? `Nome: ${jsonData.name}`:``}
${jsonData.time ? `Tempo: ${jsonData.time}`:``}
            `
            break;
            
        
        case consts.categories.GLUCOSE:
            msg = `

*${chatGptFeedbackMessage}*

Categoria: ${consts.categoriesPTBR.GLUCOSE}
${jsonData.date ? `Horário: ${formattedDate}`:``}
${jsonData.glucose ? `Índice glicêmico: ${jsonData.glucose}mg/dL`:``}
            `
            break;

        default:
            msg = `

Parece que sua mensagem está fora do contexto de saúde e diabetes. Por favor, envie uma mensagem relacionada a este tema e ficarei feliz em ajudá-lo :)
`
            break;

    }

    console.log(msg)
    return msg
  
}

module.exports = {getFeedbackMessage};