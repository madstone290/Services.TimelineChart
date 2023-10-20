declare var dayjs: any;

namespace Services.TimelineChart.Samples.BaseSample {
    export const eventOwners: any[] = [
        {
            id: 1,
            name: "H34A2900001H34A2H34A2900001H34A2900001900001",
            goodName: "sdfsdf",
            barcodeNumber: "H34A2900001",
            productNumber: "00123H1",
            pointEvents: [
                {
                    description: "불량품",
                    time: new Date(Date.parse("2020-01-01T01:30:00")),
                    entityId: 1,
                },
                {
                    description: "도색불량",
                    time: new Date(Date.parse("2020-01-01T02:45:00")),
                    entityId: 1,
                }
            ],
            rangeEvents: [
                {
                    type: "op10",
                    start: new Date(Date.parse("2020-01-01T01:30:50")),
                    end: new Date(Date.parse("2020-01-01T02:45:00")),
                    entityId: 1,
                },
                {
                    type: "op20",
                    start: new Date(Date.parse("2020-01-01T03:00:00")),
                    end: new Date(Date.parse("2020-01-01T04:05:00")),
                    entityId: 1,
                },
                {
                    type: "op30",
                    start: new Date(Date.parse("2020-01-01T06:00:00")),
                    end: new Date(Date.parse("2020-01-01T07:00:00")),
                    entityId: 1,
                },
            ],
        },
        {
            id: 2,
            name: "H34A2900002",
            barcodeNumber: "H34A2900002",
            productNumber: "00123H2",
            rangeEvents: [
                {
                    type: "op10",
                    start: new Date(Date.parse("2020-01-01T06:00:00")),
                    end: new Date(Date.parse("2020-01-01T07:00:00")),
                    entityId: 2,
                },
            ],
            pointEvents: [
                {
                    description: "불량품",
                    time: new Date(Date.parse("2020-01-01T02:00:00")),
                    entityId: 2,
                },
                {
                    description: "도색불량",
                    time: new Date(Date.parse("2020-01-01T03:00:00")),
                    entityId: 2,
                }
            ]
        },
        {
            id: 3,
            name: "H34A2900003",
            barcodeNumber: "H34A2900003",
            productNumber: "00123H3",
            rangeEvents: [
                {
                    type: "op10",
                    start: new Date(Date.parse("2020-01-01T03:15:00")),
                    end: new Date(Date.parse("2020-01-01T04:15:00")),
                    entityId: 3,
                },
                {
                    type: "op20",
                    start: new Date(Date.parse("2020-01-01T06:00:00")),
                    end: new Date(Date.parse("2020-01-01T07:00:00")),
                    entityId: 3,
                },
            ],
        },
        {
            id: 4,
            name: "H34A2900004",
            barcodeNumber: "H34A2900004",
            productNumber: "00123H4",
            rangeEvents: [
                {
                    type: "op10",
                    start: new Date(Date.parse("2020-01-01T00:40:00")),
                    end: new Date(Date.parse("2020-01-01T01:20:00")),
                    entityId: 4,
                },
                {
                    type: "op20",
                    start: new Date(Date.parse("2020-01-01T01:20:00")),
                    end: new Date(Date.parse("2020-01-01T02:00:00")),
                    entityId: 4,
                },
                {
                    type: "op30",
                    start: new Date(Date.parse("2020-01-01T02:00:00")),
                    end: new Date(Date.parse("2020-01-01T02:40:00")),
                    entityId: 4,
                },
                {
                    type: "op40",
                    start: new Date(Date.parse("2020-01-01T02:40:00")),
                    end: new Date(Date.parse("2020-01-01T03:20:00")),
                    entityId: 4,
                },
                {
                    type: "op30",
                    start: new Date(Date.parse("2020-01-01T22:00:00")),
                    end: new Date(Date.parse("2020-01-01T23:00:00")),
                    entityId: 4,
                },
                {
                    type: "op40",
                    start: new Date(Date.parse("2020-01-01T23:00:00")),
                    end: new Date(Date.parse("2020-01-01T23:50:00")),
                    entityId: 4,
                },
            ]
        },
        {
            id: 5,
            name: "H34A2900005",
            barcodeNumber: "H34A2900005",
            productNumber: "00123H5",
            rangeEvents: [
                {
                    type: "op10",
                    start: new Date(Date.parse("2020-01-01T01:40:00")),
                    end: new Date(Date.parse("2020-01-01T02:20:00")),
                    entityId: 5,
                },
                {
                    type: "op20",
                    start: new Date(Date.parse("2020-01-01T02:20:00")),
                    end: new Date(Date.parse("2020-01-01T03:00:00")),
                    entityId: 5,
                },
                {
                    type: "op30",
                    start: new Date(Date.parse("2020-01-01T03:00:00")),
                    end: new Date(Date.parse("2020-01-01T03:40:00")),
                    entityId: 5,
                },
                {
                    type: "op40",
                    start: new Date(Date.parse("2020-01-01T03:40:00")),
                    end: new Date(Date.parse("2020-01-01T04:20:00")),
                    entityId: 5,
                },
            ],
            pointEvents: [
                {
                    description: "불량품",
                    time: new Date(Date.parse("2019-12-31T22:00:00")),
                    entityId: 5,
                },
                {
                    description: "도색불량",
                    time: new Date(Date.parse("2020-01-01T02:45:12")),
                    entityId: 5,
                }
            ]
        },
        { id: 6, name: "H34A2900006" },
        { id: 7, name: "H34A2900007" },
        { id: 8, name: "H34A2900008" },
        {
            id: 9,
            name: "H34A2900009",
            barcodeNumber: "H34A2900009",
            productNumber: "00123H9",
            rangeEvents: [
                {
                    type: "op10",
                    start: new Date(Date.parse("2020-01-01T03:40:00")),
                    end: new Date(Date.parse("2020-01-01T04:20:00")),
                    entityId: 9,
                },
                {
                    type: "op20",
                    start: new Date(Date.parse("2020-01-01T04:20:00")),
                    end: new Date(Date.parse("2020-01-01T05:00:00")),
                    entityId: 9,
                },
                {
                    type: "op30",
                    start: new Date(Date.parse("2020-01-01T05:00:00")),
                    end: new Date(Date.parse("2020-01-01T05:40:00")),
                    entityId: 9,
                },
                {
                    type: "op40",
                    start: new Date(Date.parse("2020-01-01T05:40:00")),
                    end: new Date(Date.parse("2020-01-01T06:20:00")),
                    entityId: 9,
                },
            ],
            pointEvents: [
                {
                    description: "불량품",
                    time: new Date(Date.parse("2020-01-01T10:09:52")),
                    entityId: 9,
                },
            ]
        },
        { id: 10, name: "H34A2900010" },
        { id: 11, name: "H34A2900011" },
        { id: 12, name: "H34A2900012" },
        {
            id: 13,
            name: "H34A2900013",
            barcodeNumber: "H34A2900013",
            productNumber: "00123H13",
            rangeEvents: [
                {
                    type: "op30",
                    start: new Date(Date.parse("2020-01-01T06:10:01")),
                    end: new Date(Date.parse("2020-01-01T06:26:03")),
                    entityId: 13,
                },
            ],
        },
        { id: 14, name: "H34A2900014" },
        {
            id: 15,
            name: "H34A2900015",
            barcodeNumber: "H34A2900015",
            productNumber: "00123H15",
            rangeEvents: [
                {
                    type: "op10",
                    start: new Date(Date.parse("2020-01-01T12:16:16")),
                    end: new Date(Date.parse("2020-01-01T13:52:20")),
                    entityId: 15,
                },
            ],
        },
        { id: 16, name: "H34A2900016" },
        { id: 17, name: "H34A2900017" },
        { id: 18, name: "H34A2900018" },
        { id: 19, name: "H34A2900019" },
        { id: 20, name: "H34A2900020" },
    ];

    export const eventOwnersX100: any = [];
    for (let i = 0; i < 100; i++) {
        eventOwnersX100.push(...eventOwners.map(owner => owner));
    }

    const sidePointEvents = [
        {
            name: "Device Error",
            time: new Date(Date.parse("2020-01-01T00:30:00")),
        },
        {
            name: "Belt Error",
            time: new Date(Date.parse("2020-01-01T01:30:00")),
        },
        {
            name: "Machine Error",
            time: new Date(Date.parse("2020-01-01T02:30:00")),
        },
        {
            name: "Fan Error",
            time: new Date(Date.parse("2020-01-01T03:00:00")),
        },

    ];
    const globalRangeEvents = [
        {
            name: "Network Error",
            start: new Date(Date.parse("2020-01-01T00:30:00")),
            end: new Date(Date.parse("2020-01-01T01:20:00")),
        },
        {
            name: "Unplanned",
            start: new Date(Date.parse("2020-01-01T02:00:00")),
            end: new Date(Date.parse("2020-01-01T03:20:00")),
        },
        {
            name: "Planned",
            start: new Date(Date.parse("2020-01-01T03:30:00")),
            end: new Date(Date.parse("2020-01-01T04:00:00")),
        },
        {
            name: "No Data",
            start: new Date(Date.parse("2020-01-01T04:30:20")),
            end: new Date(Date.parse("2020-01-01T05:35:00")),
        }
    ];
    const ERROR_IMG_SRC = "./asset/image/error.svg";
    const WARNING_IMG_SRC = "./asset/image/warning.svg";

    const CLS_TOOLTIP = "tr-tooltip";

    const CLS_ENTITY_RANGE_EVENT = "tr-entity-range-event";
    const CLS_GLOBAL_RANGE_EVENT = "tr-global-range-event";

    const relocateTooltip = function (tooltipElement: HTMLElement, e: MouseEvent) {
        const tooltipOffset = 10;
        let top = e.clientY + tooltipOffset;
        let left = e.clientX + tooltipOffset;
        if (window.innerWidth < e.clientX + tooltipElement.offsetWidth + tooltipOffset) {
            left = window.innerWidth - tooltipElement.offsetWidth - tooltipOffset;
        }
        if (window.innerHeight < e.clientY + tooltipElement.offsetHeight + tooltipOffset) {
            top = window.innerHeight - tooltipElement.offsetHeight - tooltipOffset;
        }
        tooltipElement.style.top = top + "px";
        tooltipElement.style.left = left + "px";
    };

    function addTooltip(element: HTMLElement, tooltipElement: HTMLElement) {
        element.addEventListener("mousemove", (e) => {
            if (e.target !== element) {
                return;
            }
            relocateTooltip(tooltipElement, e);
        });
        element.addEventListener("mouseleave", (e) => {
            tooltipElement.style.visibility = "hidden";
            tooltipElement.style.opacity = "0";
        });
        element.addEventListener("mouseenter", (e) => {
            tooltipElement.style.visibility = "visible";
            tooltipElement.style.opacity = "1";
            /**
             * mouseenter이벤트만 발생하고 mousemove이벤트가 발생하지 않는 경우가 있다. ex) 휠스크롤
             * mouseenter이벤트순간부터 툴팁위치를 조정한다.
             */
            relocateTooltip(tooltipElement, e);
        });
    }

    const headerCellRender = function (time: Date, containerElement: HTMLElement) {
        const divElement = document.createElement("div");
        containerElement.appendChild(divElement);
        divElement.innerText = dayjs(time).format("HH:mm");
        divElement.style.backgroundColor = "#ddd";
        divElement.style.color = "black";
        divElement.style.textAlign = "center";
        divElement.style.height = "100%";
        divElement.style.width = "100%";
    };

    const entityPointEventRender = function (event: Services.TimelineChart.PointEvent, canvasElement: HTMLElement, containerElement: HTMLElement) {
        const imgElement = document.createElement("img");
        imgElement.style.width = "100%";
        imgElement.style.height = "100%";
        imgElement.src = ERROR_IMG_SRC;
        containerElement.appendChild(imgElement);

        const tooltipElement = document.createElement("div");
        tooltipElement.classList.add(CLS_TOOLTIP);
        canvasElement.appendChild(tooltipElement);

        const titleElement = document.createElement("div");
        titleElement.innerText = "품질 이상";
        titleElement.style.fontWeight = "bold";
        titleElement.style.textAlign = "center";
        titleElement.style.color = "black"
        tooltipElement.appendChild(titleElement);



        const timeElement = document.createElement("div");
        timeElement.innerText = dayjs(event.time).format("HH:mm:ss");
        tooltipElement.appendChild(timeElement);

        addTooltip(imgElement, tooltipElement);
    };

    let colors: string[] = [];
    let colorIdex = 0;
    let colorCreated: boolean = false;
    function getRandomColor() {
        if (!colorCreated) {

            for (let i = 0; i < 100; i++) {
                const r = Math.floor((Math.random() * 128) + 1);
                const g = Math.floor((Math.random() * 128) + 1);
                const b = Math.floor((Math.random() * 128) + 1);
                const color = "#" + r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0");
                colors.push(color);
            }
            colorCreated = true;
            console.log(colors);
        }
        if (colors.length <= colorIdex)
            colorIdex = 0;
        return colors[colorIdex++];
    }

    const entityRangeEventRender = function (event: Services.TimelineChart.RangeEvent, canvasElement: HTMLElement, containerElement: HTMLElement) {
        const boxElement = document.createElement("div");
        containerElement.appendChild(boxElement);
        boxElement.style.width = "100%";
        boxElement.style.height = "100%";
        boxElement.style.backgroundColor = getRandomColor();
        boxElement.classList.add(CLS_ENTITY_RANGE_EVENT);

        const tooltipElement = document.createElement("div");
        tooltipElement.classList.add(CLS_TOOLTIP);
        canvasElement.appendChild(tooltipElement);


        const timeElement = document.createElement("div");
        timeElement.innerText = dayjs(event.startTime).format("HH:mm:ss") + " ~ " + dayjs(event.endTime).format("HH:mm:ss");
        tooltipElement.appendChild(timeElement);

        addTooltip(boxElement, tooltipElement);
    };

    const sidePointEventRender = function (event: PointEvent, canvasElement: HTMLElement, containerElement: HTMLElement) {
        const imgElement = document.createElement("img");
        imgElement.style.width = "100%";
        imgElement.style.height = "100%";
        imgElement.src = WARNING_IMG_SRC;
        containerElement.appendChild(imgElement);

        const tooltipElement = document.createElement("div");
        tooltipElement.classList.add(CLS_TOOLTIP);
        canvasElement.appendChild(tooltipElement);

        const titleElement = document.createElement("div");
        titleElement.innerText = "설비 이상";
        titleElement.style.fontWeight = "bold";
        titleElement.style.textAlign = "center";
        titleElement.style.color = "black"
        tooltipElement.appendChild(titleElement);

        const descElement = document.createElement("div");
        descElement.innerText = event.description;
        tooltipElement.appendChild(descElement);

        const timeElement = document.createElement("div");
        timeElement.innerText = dayjs(event.time).format("HH:mm:ss");
        tooltipElement.appendChild(timeElement);

        addTooltip(imgElement, tooltipElement);
    };

    const globalRangeEventRender = function (event: any, canvasElement: HTMLElement, containerElement: HTMLElement) {
        const boxElement = document.createElement("div");
        containerElement.appendChild(boxElement);
        boxElement.style.width = "100%";
        boxElement.style.height = "100%";
        boxElement.style.backgroundColor = getRandomColor();
        boxElement.style.opacity = "0.8";
        boxElement.classList.add(CLS_GLOBAL_RANGE_EVENT);

        const tooltipElement = document.createElement("div");
        tooltipElement.classList.add(CLS_TOOLTIP);
        canvasElement.appendChild(tooltipElement);

        const typeElement = document.createElement("div");
        typeElement.innerText = event.name;
        typeElement.style.fontWeight = "bold";
        typeElement.style.textAlign = "center";
        typeElement.style.color = "black"
        tooltipElement.appendChild(typeElement);

        const timeElement = document.createElement("div");
        timeElement.innerText = dayjs(event.start).format("HH:mm:ss") + " ~ " + dayjs(event.end).format("HH:mm:ss");
        tooltipElement.appendChild(timeElement);

        addTooltip(boxElement, tooltipElement);
    };

    export function load() {
        const rootContainer = document.getElementById("root-container");
        const data: Services.TimelineChart.ChartData = {
            entities: Services.TimelineChart.Samples.BaseSample.eventOwnersX100,
            sidePointEvents: sidePointEvents,
            globalRangeEvents: globalRangeEvents as any,
        };

        const cellMinutes = 30;
        const cellWidth = 50;
        const cellHeight = 50;
        const options: Services.TimelineChart.ChartOptions = {
            mainTitle: "XXX H/L LH Line 03",
            subTitle: "Serial No.",
            headerTitle: "Time Line",
            chartStartTime: new Date(Date.parse("2020-01-01T00:00:00")),
            chartEndTime: new Date(Date.parse("2020-01-02T00:00:00")),
            timelineTitleHeight: cellHeight,
            timelineHeaderHeight: cellHeight,
            timelineCanvasHeight: cellHeight,
            timelineCanvasContentHeightRatio: 0.6,
            cellMinutes: cellMinutes,
            cellWidth: cellWidth,
            cellHeight: cellHeight,
            cellContentHeightRatio: 0.6,
            canAutoFit: true,
            hasHorizontalLine: true,
            hasVerticalLine: true,
            headerCellRender: headerCellRender,
            entityPointEventRender: entityPointEventRender,
            entityRangeEventRender: entityRangeEventRender,
            sidePointEventRender: sidePointEventRender,
            globalRangeEventRender: globalRangeEventRender,
        }

        const dataOptions: Services.TimelineChart.ChartDataOptions = {
            entityNameProp: "name",
            pointEventTimeProp: "time",
            entityPointEventsProp: "pointEvents",
            entityRangeEventsProp: "rangeEvents",
            rangeEventStartTimeProp: "start",
            rangeEventEndTimeProp: "end",
        };

        const chart = Services.TimelineChart.TimelineChart();
        chart.create(rootContainer, data, options, dataOptions);
        chart.render();
    }
}


window.addEventListener("load", () => {
    Services.TimelineChart.Samples.BaseSample.load();
});
