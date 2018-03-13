import * as React from "react";

export default ({ body, assets, initialState }) => (
  <html>
    <head>
      <link rel="stylesheet" href="http://assets.staticlp.com/rizzo-next/0.30.2/core.css" />
      <link rel="stylesheet" href="http://assets.staticlp.com/rizzo-next/0.30.2/rizzo-next.css" />
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
