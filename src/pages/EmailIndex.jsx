import { EmailFolderList } from "../cmps/EmailFolderList"
import {EmailHeader} from "../cmps/EmailHeader"

export function EmailIndex() {
  return <section className="email-index">
    <EmailHeader />
    <EmailFolderList />
  </section>
}