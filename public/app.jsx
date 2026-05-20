// ============================================
// App — root router + landing popup gate
// ============================================

function App() {
  const [route, setRoute] = React.useState(() => {
    const hash = window.location.hash.replace("#", "");
    return hash || "home";
  });

  const [showPopup, setShowPopup] = React.useState(() => {
    // show only on first load of the session
    try { return !sessionStorage.getItem("taeyang.popupShown"); } catch { return true; }
  });

  // Sync route to URL hash (lets refresh keep state)
  React.useEffect(() => {
    window.location.hash = route;
  }, [route]);

  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#", "");
      if (h) setRoute(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const dismissPopup = () => {
    try { sessionStorage.setItem("taeyang.popupShown", "1"); } catch {}
    setShowPopup(false);
  };

  let page;
  if (route === "home") page = <HomePage setRoute={setRoute} />;
  else if (route === "games") page = <GamesPage setRoute={setRoute} />;
  else if (route === "pet") page = <PetPage setRoute={setRoute} />;
  else if (route === "birthday") page = <BirthdayPage setRoute={setRoute} />;
  else if (route === "game-suika") page = <SuikaGame setRoute={setRoute} />;
  else if (route === "game-quiz") page = <QuizGame setRoute={setRoute} />;
  else if (route === "game-memory") page = <MemoryGame setRoute={setRoute} />;
  else page = <HomePage setRoute={setRoute} />;

  return (
    <React.Fragment>
      <Navbar route={route} setRoute={setRoute} />
      {page}
      {showPopup && <LandingPopup onClose={dismissPopup} />}
    </React.Fragment>
  );
}

function Root() {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
