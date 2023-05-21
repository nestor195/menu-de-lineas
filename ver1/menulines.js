function MenuLines() {
    const lineas = [];
    const div = document.createElement("div");
    const configuration = {
        topMargin: '50px',
        bottomMargin: '50px',
        zIndex : 'unset',
    };
    this.e = ()=>{
        return div;
    };

    div.classList.add("menu-lines");

    this.setConfiguration = c => {
        if (c.topMargin) {
            configuration.topMargin = c.topMargin;
        }
        if (c.bottomMargin) {
            configuration.bottomMargin = c.bottomMargin;
        }
        if (c.zIndex) {
            configuration.zIndex = c.zIndex;
        }
    }

    this.setLines = l => {
        while (lineas.length > 0) {
            lineas.pop();
        }
        // recorro l y lo agrego a lineas
        for (let i = 0; i < l.length; i++) {
            lineas.push(l[i]);
        }
    }

    this.getLines = () => {
        return lineas;
    }
    this.showLines = () => {
        div.remove();
        div.style.display = 'none';
        div.innerHTML = "";
        div.style.top = configuration.topMargin;
        div.style.zIndex = configuration.zIndex;
        div.style.height = "calc(100vh - " + configuration.topMargin + " - " + configuration.bottomMargin + ")";
        for (let i = 0; i < lineas.length; i++) {
            const element = document.createElement("div");
            element.addEventListener("click", () => {
                div.childNodes.forEach((child)=>{
                    child.classList.remove('classname');                    
                });
                                
                element.classList.add('classname');
                element.classList.remove('line');
                this.e().dispatchEvent(new CustomEvent("selectLine", {
                    detail: {key:i}
                }));
            });
            
            element.classList.add("line");
            element.style.width = "3.4em";
            element.style.height = "3.4em";
            element.style.display = "flex";
            element.style.justifyContent = "center";
            element.style.alignItems = "center";
            element.style.borderRadius = "50%";
            element.style.margin = "3px";
            element.style.background = `linear-gradient(to top, ${lineas[i].color}, ${lighten(lineas[i].color,80)})`;
            //element.innerHTML = darken(lineas[i].color,100);
            
            div.appendChild(element);
            const element2 = document.createElement("div");
            // element2.innerHTML = lineas[i].linea_nombre + lineas[i].color;
            element2.style.background = `linear-gradient(to top, ${darken(lineas[i].color,80)}, ${lineas[i].color})`;
            element2.style.width = "3.1em";
            element2.style.height = "3.1em";
            element2.style.display = "flex";
            element2.style.justifyContent = "center";
            element2.style.alignItems = "center";
            element2.style.borderRadius = "50%";
            element.appendChild(element2);
            const element3 = document.createElement("div");
            element3.style.background = lineas[i].color;
            element3.style.width = "2.8em";
            element3.style.height = "2.8em";
            element3.style.display = "flex";
            element3.style.justifyContent = "center";
            element3.style.alignItems = "center";
            element3.style.borderRadius = "50%";
            element2.appendChild(element3);
            const element4 = document.createElement("div");
            element4.innerHTML = lineas[i].linea_nombre;
            if (lineas[i].linea_nombre.length > 5) {
                element4.style.fontSize = ".6em";
            } else {
                element4.style.fontSize = "1.4em";
            }
            element4.style.fontWeight = "bold";
            element4.style.color = 'black';
            element4.style.textShadow =  '0px 0px .2em rgba(255, 255, 255, 5)';
            element3.appendChild(element4);
        }
        document.body.appendChild(div);
        div.style.display = 'block';
    }

    this.hideLines = () => {
        div.remove();
    }
    const addLight = (color, amount)=>{
        let cc = parseInt(color,16) + amount;
        let c = (cc > 255) ? 255 : (cc);
        c = (c.toString(16).length > 1 ) ? c.toString(16) : `0${c.toString(16)}`;
        return c;
    }
    const lighten = (color, amount)=> {
        color = (color.indexOf("#")>=0) ? color.substring(1,color.length) : color;
        amount = parseInt((255*amount)/100);
        return color = `#${addLight(color.substring(0,2), amount)}${addLight(color.substring(2,4), amount)}${addLight(color.substring(4,6), amount)}`;
    }

    const subtractLight = (color, amount)=>{
        let cc = parseInt(color,16) - amount;
        let c = (cc < 0) ? 0 : (cc);
        c = (c.toString(16).length > 1 ) ? c.toString(16) : `0${c.toString(16)}`;
        return c;
    }
    const darken = (color, amount) =>{
        color = (color.indexOf("#")>=0) ? color.substring(1,color.length) : color;
        amount = parseInt((255*amount)/100);
        return color = `#${subtractLight(color.substring(0,2), amount)}${subtractLight(color.substring(2,4), amount)}${subtractLight(color.substring(4,6), amount)}`;
    }
}



const nfetch = (url, options = {})=>{
    const { timeout } = options;
    const controller = new AbortController();
    let timeoutId = null;
    if (timeout) {
        timeoutId = setTimeout(() => {
            controller.abort();
        }, timeout);
    }
    
    return fetch(url, {
        ...options,
        signal: controller.signal
    })
    .finally(() => {
        clearTimeout(timeoutId);
    });
}