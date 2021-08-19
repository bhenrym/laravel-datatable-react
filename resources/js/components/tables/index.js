import tableComponent from "./Table";

export default {
    install(vue, opts) {
        // Create plugin's root Vue instance
        const yrnehTable = new Vue({
            render: createElement => createElement(tableComponent)
        });

        // Make the root instance available in all components
        vue.prototype.$yrnehTable = yrnehTable;

        // 1. agregar método global o propiedad
        yrnehTable.resetFilter = function() {
            // algo de lógica...
            yrnehTable.$emit('event.resetFilter');
        };

        yrnehTable.reset = function() {
            // algo de lógica...
            yrnehTable.$emit('event.reset');
        };

        yrnehTable.refresh = function() {
            // algo de lógica...
            yrnehTable.$emit('event.refresh');
        };

        // 2. agregar un recurso global
        vue.directive("my-directive", {
            bind(el, binding, vnode, oldVnode) {
                // algo de lógica...
            }
        });

        // 3. inyectar algunas opciones de componentes
        vue.mixin({
            created: function() {
                // algo de lógica...
            }
        });


        // 4. agregar un método de instancia
        vue.prototype.$myMethod = function(methodOptions) {
            // algo de lógica...
        };
    }
};
