import mark from './assets/bytelabs-mark.svg';
import './ProjectCredit.css';

/** Use theme="dark" on dark project footers. Supply your confirmed studio URL to make the credit a link. */
export default function ProjectCredit({ href, theme = 'light', showTagline = true }) {
  const Tag = href ? 'a' : 'div';
  return <Tag className={`bytelabs-credit bytelabs-credit--${theme}`} {...(href ? { href, target: '_blank', rel: 'noopener noreferrer', 'aria-label': 'Developed by ByteLabs — visit the studio website' } : {})}>
    <img src={mark} width="40" height="40" alt="" />
    <span className="bytelabs-credit__copy"><span className="bytelabs-credit__label">Developed by</span><span className="bytelabs-credit__name">byte<span>labs</span><i>.</i></span>{showTagline && <span className="bytelabs-credit__tagline">Crafted for impact.</span>}</span>
    {href && <span className="bytelabs-credit__arrow" aria-hidden="true">↗</span>}
  </Tag>;
}
