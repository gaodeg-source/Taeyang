import { useLang } from "../LangContext";
import "./About.css";

export default function About() {
  const { t } = useLang();
  const tl = t("about_tl");
  const traits = t("about_traits");

  return (
    <main className="page about-page">
      <div className="about-container">
        <h1 className="page-heading">{t("about_title")}</h1>

        {/* Profile card */}
        <section className="profile-card">
          <div className="profile-sun-col">
            <div className="big-sun-wrap">
              <div className="big-sun-rays" />
              <div className="big-sun-core">☀️</div>
            </div>
            <p className="profile-stage">Taeyang • 태양</p>
            <p className="profile-group">NEWBEAT</p>
          </div>

          <div className="profile-info-col">
            <h2 className="profile-section-label">{t("about_profile")}</h2>
            <table className="profile-table">
              <tbody>
                {[
                  [t("about_full_name"), t("about_full_name_val")],
                  [t("about_born"), t("about_born_val")],
                  [t("about_birthplace"), t("about_birthplace_val")],
                  [t("about_label"), t("about_label_val")],
                  [t("home_height"), t("home_height_val")],
                  [t("home_mbti"), t("home_mbti_val")],
                  [t("home_nickname"), t("home_nickname_val")],
                  [t("home_debut"), t("home_debut_val")],
                ].map(([label, val]) => (
                  <tr key={label}>
                    <td className="td-label">{label}</td>
                    <td className="td-val">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Timeline */}
        <section className="timeline-section">
          <h2 className="section-heading">{t("about_timeline_title")}</h2>
          <div className="timeline">
            {tl.map((item, i) => (
              <div className="tl-item" key={i}>
                <div className="tl-year">{item.year}</div>
                <div className="tl-dot" />
                <div className="tl-text">{item.event}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Personality */}
        <section className="personality-section">
          <h2 className="section-heading">{t("about_personality_title")}</h2>
          <div className="traits-grid">
            {traits.map((trait, i) => (
              <div className="trait-chip" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="trait-star">✦</span> {trait}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
