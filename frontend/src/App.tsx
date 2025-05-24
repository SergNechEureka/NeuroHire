import React from "react";
import MetaTable from "./MetaTable";

function App() {
  React.useEffect(() => {
    document.body.classList.add('dark');
    return () => document.body.classList.remove('dark');
  }, []);

  return (
    <div>
      <h1>CV Metadata</h1>
      <MetaTable />
    </div>
  );
}

export default App;