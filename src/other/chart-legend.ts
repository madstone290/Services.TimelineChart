interface LegendData {
    /**
     * 왼쪽 범례 아이템 목록
     */
    leftItems: LegendItem[];

    /**
     * 오른쪽 범례 아이템 목록
     */
    rightItems: LegendItem[];
}


/**
 * 범례
 */
interface LegendItem {
    label: string;
    color?: string;
    icon?: string;
}


const ChartLegend = function () {
    const CLS_LEGEND_ITEM = "tr-legend-item";
    const CLS_LEGEND_ITEM_ICON = "tr-legend-item-icon";
    const CLS_LEGEND_ITEM_COLOR = "tr-legend-item-color";
    const CLS_LEGEND_ITEM_LABEL = "tr-legend-item-label";

    const CLS_LEGEND_BOX = "tr-legend-box";
    const CLS_LEFT_LEGEND_BOX = "tr-legend-left-box";
    const CLS_RIGHT_LEGEND_BOX = "tr-legend-right-box";

    let _data: LegendData;

    let _leftLegendElement: HTMLElement;
    let _rightLegendElement: HTMLElement;



    function create(container: HTMLElement) {
        const elementString = `
        <div class="${CLS_LEGEND_BOX}">
            <div class="${CLS_LEFT_LEGEND_BOX}"></div>
            <div class="${CLS_RIGHT_LEGEND_BOX}"></div>
        </div>
        `;
        const parser = new DOMParser();
        const doc = parser.parseFromString(elementString, 'text/html');
        const element = doc.body.firstChild;
        container.appendChild(element);

        _leftLegendElement = container.getElementsByClassName(CLS_LEFT_LEGEND_BOX)[0] as HTMLElement;
        _rightLegendElement = container.getElementsByClassName(CLS_RIGHT_LEGEND_BOX)[0] as HTMLElement;
    }

    function setData(data: LegendData) {
        _data = data;
    }

    function render() {
        drawLegendItems(_data.leftItems, _leftLegendElement);
        drawLegendItems(_data.rightItems, _rightLegendElement);
    }

    function drawLegendItems(items: LegendItem[], container: HTMLElement) {
        if (items == null || items.length == 0)
            return;

        container.replaceChildren();

        for (const item of items) {
            const box = document.createElement("div");
            box.classList.add(CLS_LEGEND_ITEM);
            container.appendChild(box);

            if (item.icon) {
                const icon = document.createElement("img");
                icon.classList.add(CLS_LEGEND_ITEM_ICON);
                icon.src = item.icon;
                box.appendChild(icon);
            } else {
                const color = document.createElement("div");
                color.classList.add(CLS_LEGEND_ITEM_COLOR);
                color.style.backgroundColor = item.color;
                box.appendChild(color);
            }

            const label = document.createElement("div");
            label.classList.add(CLS_LEGEND_ITEM_LABEL);
            label.innerText = item.label;
            box.appendChild(label);
        }
    }

    return {
        create,
        setData,
        render
    }
};