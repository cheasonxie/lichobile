import settings from '../../../settings'
import popupWidget from '../../shared/popup'
import i18n from '../../../i18n'
import router from '../../../router'
import {TournamentState} from '../interfaces'

let isOpen = false
let tournamentCtrl: TournamentState

export default {
  open,
  close,
  view() {
    return popupWidget(
      'tournament_password_popup',
      undefined,
      () => renderForm(),
      isOpen,
      close
    )
  }
}

function open(ctrl: TournamentState) {
  router.backbutton.stack.push(close)
  isOpen = true
  tournamentCtrl = ctrl
}

function close(fromBB?: string) {
  if (fromBB !== 'backbutton' && isOpen) router.backbutton.stack.pop()
  isOpen = false
}

function renderForm() {
  return (
    <form id="tournamentPasswordForm"
    onsubmit={function(e: Event) {
      e.preventDefault()
      return join(e.target as HTMLFormElement)
    }}>
      <fieldset>
        <div className={'select_input no_arrow_after' + (settings.tournament.private() ? '' : ' notVisible')}>
          <div className="text_input_container">
            <label>Password: </label>
            <input type="text" id="tournamentPassword" className="passwordField" />
          </div>
        </div>
      </fieldset>
      <button key="join" className="newGameButton" type="submit">
        <span className="fa fa-check" />
        {i18n('join')}
      </button>
    </form>
  )
}

function join(form: HTMLFormElement) {
  const elements: HTMLCollection = form[0].elements as HTMLCollection
  const password = (elements[0] as HTMLInputElement).value
  tournamentCtrl.join(tournamentCtrl.tournament().id, password)
  close()
}
