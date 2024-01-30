export default async function HomePage() {
    return (
      <div>
        <h1>Info page</h1>
        <p>Here resides the app structure, every dir is a route. 
            All routes contain a <b>page.tsx</b> file, that has the html that is shown to the user when routing to the <b>/[directory_name]</b>.</p>
      </div>
    )
  }