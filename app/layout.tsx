import * as React from "react";

export default ({ body, assets, initialState }) => (
  <html>
    <head>
      <link rel="stylesheet" href="https://unpkg.com/rizzo-next@0.26.4/dist/core.css" />
      <link rel="stylesheet" href="https://unpkg.com/rizzo-next@0.26.4/dist/rizzo-next.css" />  
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: body }}></div>

      <script type="application/json" id="initialState" dangerouslySetInnerHTML={{ __html: initialState }} />
      <script src={assets["manifest.js"]} />
      <script src={assets["vendor.js"]} />
      <script src={assets["common.js"]} />
      <script src={assets["app.js"]} />
    </body>
  </html>
)
