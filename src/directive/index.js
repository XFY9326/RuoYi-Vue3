import hasRole from "./permission/hasRole";
import hasPermi from "./permission/hasPermi";
import clipboard from "./module/clipboard";

/**
 * @param {import("vue").App} app
 */
export default function directive(app) {
    app.directive("hasRole", hasRole);
    app.directive("hasPermi", hasPermi);
    app.directive("clipboard", clipboard);
}
