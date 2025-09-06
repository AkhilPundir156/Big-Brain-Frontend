import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./store";

import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App />
    </Provider>
);

/**
    Tasks -: 
        1. Fixing My Profile with according to the navbar width
        2. Creating Home page
        3. Creating About us page
        4. Creating How to use page
        5. Creating About developr page
        6. Fxing my contact page
        7. Properly fixing My Brain Card.
        8. Properly showing View items. 
        9. Brain Item Fixing in both cases when showing and editing. Also Editing Tags and other fields to be add on the basis of type.
        10. Fixing Brain chat component with proper desiging.
        11. Adding Toast to Every action Done in overall Website.
        12. Complete Shared Brain Component.
        13. Adding Footer Compoent Properly.
        14. Fixing Responsive-ness.
        15. Adding loader to ui and use it against every request.
        16. If we can stream the LLM response Would best in the case, then just waiting for the whole response.
        17. Create brainService and use its funciton overall in the app ------------> almost complete.
        18. Create userService and use its function overall in the app ------------> almost Complete
        19. Adding the Search bar in the my-brain component in between and making debounced on that and filter the brain using elastic search or any thing like that.
 */