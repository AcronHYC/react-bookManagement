import { createBrowserHistory as createHistory } from "history";
import dva from "dva";
import createLoading from "dva-loading";

// 1. Initialize
const app = dva({
  history: createHistory(),
  onError(error) {
    console.error("app onError -- ", error);
  }
});

// 2. Plugins
app.use(createLoading({ effects: true }));

// 3. Model
app.model(require("./models/login").default);
app.model(require("./models/admin").default);
app.model(require("./models/reader").default);
app.model(require("./models/book").default);

// 4. Router for browserHistory dynamic load
app.router(require("./router").default);

// 5. Start
app.start("#root");

export default app;
