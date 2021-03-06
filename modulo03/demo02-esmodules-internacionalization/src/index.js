import database from './../database.json'
import Person from './person.js'
import TerminalController from './terminalController.js'
import { save } from './repository.js'

const DEFAULT_LANG = "pt-BR"
const STOP_TERM = ":q"

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
  try {
    const answer = await terminalController.question()
    if(answer === STOP_TERM){
      terminalController.closeTerminal()
      console.log('process finished!')
      return;
    }
    const person = Person.generateInstanceFromString(answer)
    terminalController.updateTable(person.formatted(DEFAULT_LANG))
    await save(person)
    //console.log('person', ) //2 Bike,Aviao,Navio 200000 2020-01-01 2020-03-30
    await mainLoop()
  } catch (error) {
    console.log('ERRO: ', error)
    return mainLoop
  }
}

await mainLoop()