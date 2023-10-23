declare var dayjs: any;

namespace Services.TimelineChart.Samples.SingleMesSample {
    interface MesEntity {
        id?: any;
        name?: string;
        barcodeNumber?: string;
        productNumber?: string;
        pointEvents?: MesEntityPointEvent[];
        rangeEvents?: MesEntityRangeEvent[];
    }

    /**
     * 바코드 포인트이벤트(품질이상)
     */
    interface MesEntityPointEvent {
        id?: any;
        entityId?: any;
        time?: Date;
        description?: string;
    }

    interface MesEntityRangeEvent {
        id?: any;
        entityId?: any;
        type: "op10" | "op20" | "op30" | "op40" | "op50";
        description?: string;
        start?: Date;
        end?: Date;
    }

    /**
     * 설비 글로벌 이벤트(계획정지/비가동/네트워크이상/바코드누락)
     */
    interface MesGlobalRangeEvent {
        id?: any;
        type: "pause" | "fault" | "barcodeMissing" | "networkError";
        description?: string;
        start?: Date;
        end?: Date;
    }

    /**
     * 설비 이벤트(설비이상)
     */
    interface MesSidePointEvents {
        id?: any;
        time?: Date;
        description?: string;
    }

    const legendData = {
        leftLegendItems: [
            { color: "#92d050", label: "Op 10" },
            { color: "#00b0f0", label: "Op 20" },
            { color: "#ffc000", label: "Op 30" },
            { color: "#7030a0", label: "Op 40" },
            { color: "#f2460d", label: "Op 50" }
        ],
        rightLegendItems: [
            { color: "#d9d9d9", label: "계획정지" },
            { color: "#7f7f7f", label: "비가동" },
            { color: "#cc00ff", label: "네트워크이상" },
            { color: "#081fda", label: "바코드누락" },
            { icon: "./asset/image/warning.svg", label: "설비이상" },
            { icon: "./asset/image/error.svg", label: "품질이상" },
        ]
    }
    const entities: any[] = [
        {
            id: 1,
            name: "H34A2900001",
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

    const entitiesX100: any[] = [];
    for (let i = 0; i < 30; i++) {
        entitiesX100.push(...entities.map(entity => entity));
    }

    const sidePointEvents = [
        {
            description: "X모터 이상",
            time: new Date(Date.parse("2020-01-01T00:00:00")),
        },
        {
            id: 1,
            description: "서보모터 이상",
            time: new Date(Date.parse("2020-01-01T01:30:00")),
        },
        {
            id: 2,
            description: "냉각기 이상",
            time: new Date(Date.parse("2020-01-01T02:30:00")),
        },
        {
            id: 3,
            description: "온수기 이상",
            time: new Date(Date.parse("2020-01-01T03:00:00")),
        },
        {
            id: 4,
            description: "냉각기 이상",
            time: new Date(Date.parse("2020-01-01T03:02:00")),
        },
        {
            id: 5,
            description: "Test Error Test Error Test Error Test Error",
            time: new Date(Date.parse("2020-01-01T22:00:00")),
        },
        {
            id: 6,
            description: "온수기 이상",
            time: new Date(Date.parse("2020-01-01T21:29:25")),
        },
    ];
    const globalRangeEvents = [
        {
            type: "pause",
            description: "계획정지 00:30~03:30",
            start: new Date(Date.parse("2020-01-01T00:30:00")),
            end: new Date(Date.parse("2020-01-01T03:30:00")),
        },
        {
            type: "barcodeMissing",
            description: "바코드 누락 04:00~04:30",
            start: new Date(Date.parse("2020-01-01T04:00:00")),
            end: new Date(Date.parse("2020-01-01T04:30:00")),
        },
        {
            type: "networkError",
            description: "네트워크 이상 05:30~06:30",
            start: new Date(Date.parse("2020-01-01T05:30:00")),
            end: new Date(Date.parse("2020-01-01T06:30:00")),
        },
        {
            type: "networkError",
            description: "네트워크 이상 22:30~23:30",
            start: new Date(Date.parse("2020-01-01T22:30:00")),
            end: new Date(Date.parse("2020-01-01T23:30:00")),
        },
        {
            type: "fault",
            description: "비가동",
            start: new Date(Date.parse("2020-01-01T08:10:20")),
            end: new Date(Date.parse("2020-01-01T08:43:00")),
        },
        {
            type: "barcodeMissing",
            description: "바코드 누락",
            start: new Date(Date.parse("2020-01-01T15:58:53")),
            end: new Date(Date.parse("2020-01-01T17:12:42")),
        },
    ];

    const entityRangeEventColors = new Map([
        ["op10", "#92d050"],
        ["op20", "#00b0f0"],
        ["op30", "#ffc000"],
        ["op40", "#7030a0"],
        ["op50", "#f2460d"]
    ]);
    const globalRangeEventColors = new Map([
        ["pause", "#d9d9d9"],
        ["fault", "#7f7f7f"],
        ["networkError", "#cc00ff"],
        ["barcodeMissing", "#081fda"]
    ]);
    const globalRangeEventNames = new Map([
        ["pause", "계획정지 (휴식)"],
        ["fault", "비가동 (설비고장)"],
        ["networkError", "네트워크 이상"],
        ["barcodeMissing", "바코드 누락"]
    ]);

    const ERROR_IMG_SRC = "./asset/image/error.svg";
    const WARNING_IMG_SRC = "./asset/image/warning.svg";

    const CLS_TOOLTIP = "tr-tooltip";
    const CLS_ENTITY_RANGE_EVENT = "tr-entity-range-event";
    const CLS_GLOBAL_RANGE_EVENT = "tr-global-range-event";

    const COLOR_SELECTED_EVENT = "#333";


    function getTimeDiff(start: Date, end: Date) {
        const totalMilliseconds = end.getTime() - start.getTime();
        const totalSeconds = totalMilliseconds / 1000;
        const totalMinutes = totalSeconds / 60;
        const totalHours = totalMinutes / 60;
        const totalDays = totalHours / 24;
        const totalMonths = totalDays / 30;
        const totalYears = totalMonths / 12;

        const milliseconds = Math.floor(totalMilliseconds % 1000);
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalMinutes % 60);
        const hours = Math.floor(totalHours % 24);
        const days = Math.floor(totalDays % 30);
        const months = Math.floor(totalMonths % 12);
        const years = Math.floor(totalYears);

        return {
            years: years,
            months: months,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            milliseconds: milliseconds,

            totalYears: totalYears,
            totalMonths: totalMonths,
            totalDays: totalDays,
            totalHours: totalHours,
            totalMinutes: totalMinutes,
            totalSeconds: totalSeconds,
            totalMilliseconds: totalMilliseconds,
        };
    }

    function getTimeDiffString(timeDiff: any) {
        let timeDiffString = '';
        if (timeDiff.years > 0) {
            timeDiffString = timeDiffString + timeDiff.years + "년";
        }
        if (timeDiff.months > 0) {
            timeDiffString = timeDiffString + timeDiff.months + "개월";
        }
        if (timeDiff.days > 0) {
            timeDiffString = timeDiffString + timeDiff.days + "일";
        }
        if (timeDiff.hours > 0) {
            timeDiffString = timeDiffString + timeDiff.hours + "시간";
        }
        if (timeDiff.minutes > 0) {
            timeDiffString = timeDiffString + timeDiff.minutes + "분";
        }
        if (timeDiff.seconds > 0) {
            timeDiffString = timeDiffString + timeDiff.seconds + "초";
        }
        if (timeDiffString === '')
            timeDiffString = '0초';
        return timeDiffString;
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

    /**
     * 엘리먼트에 툴팁을 추가한다.
     * @param element 툴팁을 추가할 엘리먼트
     * @param tooltipElement 툴팁 엘리먼트
     */
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

    function addHoverColor(element: HTMLElement, hoverColor: string) {
        const originalColor = element.style.backgroundColor;
        element.addEventListener("mouseenter", (e) => {
            element.style.backgroundColor = hoverColor;
        });
        element.addEventListener("mouseleave", (e) => {
            element.style.backgroundColor = originalColor;
        });
    }

    const entityPointEventRender = function (event: any, canvasElement: HTMLElement, containerElement: HTMLElement) {
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

        const barcode = entities.find(x => x.id == event.entityId);
        const barcodeElement = document.createElement("div");
        barcodeElement.innerText = `Barcode: ${barcode.barcodeNumber}`;
        tooltipElement.appendChild(barcodeElement);

        const productElement = document.createElement("div");
        productElement.innerText = `ProductNo: ${barcode.productNumber}`;
        tooltipElement.appendChild(productElement);

        const descElement = document.createElement("div");
        descElement.innerText = event.description;
        tooltipElement.appendChild(descElement);

        const timeElement = document.createElement("div");
        timeElement.innerText = dayjs(event.time).format("HH:mm:ss");
        tooltipElement.appendChild(timeElement);

        addTooltip(imgElement, tooltipElement);
        addHoverColor(imgElement, COLOR_SELECTED_EVENT);
    };
    const entityRangeEventRender = function (event: any, canvasElement: HTMLElement, containerElement: HTMLElement) {
        const boxElement = document.createElement("div");
        containerElement.appendChild(boxElement);
        boxElement.style.width = "100%";
        boxElement.style.height = "100%";
        boxElement.style.backgroundColor = entityRangeEventColors.get(event.type);
        boxElement.classList.add(CLS_ENTITY_RANGE_EVENT);

        const tooltipElement = document.createElement("div");
        tooltipElement.classList.add(CLS_TOOLTIP);
        canvasElement.appendChild(tooltipElement);

        const typeElement = document.createElement("div");
        typeElement.innerText = event.type;
        typeElement.style.fontWeight = "bold";
        typeElement.style.textAlign = "center";
        typeElement.style.color = "black"
        tooltipElement.appendChild(typeElement);

        const timeDifference = getTimeDiff(event.start, event.end);
        const timeDifferenceString = getTimeDiffString(timeDifference);
        const timeElement = document.createElement("div");
        timeElement.innerText = dayjs(event.start).format("HH:mm:ss") + " ~ " + dayjs(event.end).format("HH:mm:ss") + " (" + timeDifferenceString + ")";
        tooltipElement.appendChild(timeElement);

        const barcodeElement = document.createElement("div");
        barcodeElement.innerText = entities.find(entity => entity.id == event.entityId).name;
        tooltipElement.appendChild(barcodeElement);

        const barcode = entities.find(x => x.id == event.entityId);
        const productElement = document.createElement("div");
        productElement.innerText = `ProductNo: ${barcode.productNumber}`;
        tooltipElement.appendChild(productElement);

        const descElement = document.createElement("div");
        descElement.innerText = event.description;
        tooltipElement.appendChild(descElement);

        addTooltip(boxElement, tooltipElement);
        addHoverColor(boxElement, COLOR_SELECTED_EVENT);
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
        addHoverColor(imgElement, COLOR_SELECTED_EVENT);
    };

    const globalRangeEventRender = function (event: any, canvasElement: HTMLElement, containerElement: HTMLElement) {
        const boxElement = document.createElement("div");
        containerElement.appendChild(boxElement);
        boxElement.style.width = "100%";
        boxElement.style.height = "100%";
        boxElement.style.backgroundColor = globalRangeEventColors.get(event.type);
        boxElement.style.opacity = "0.8";
        boxElement.classList.add(CLS_GLOBAL_RANGE_EVENT);

        const tooltipElement = document.createElement("div");
        tooltipElement.classList.add(CLS_TOOLTIP);
        canvasElement.appendChild(tooltipElement);

        const typeElement = document.createElement("div");
        typeElement.innerText = globalRangeEventNames.get(event.type);
        typeElement.style.fontWeight = "bold";
        typeElement.style.textAlign = "center";
        typeElement.style.color = "black"
        tooltipElement.appendChild(typeElement);

        const timeDifference = getTimeDiff(event.start, event.end);
        const timeDifferenceString = getTimeDiffString(timeDifference);
        const timeElement = document.createElement("div");
        timeElement.innerText = dayjs(event.start).format("HH:mm:ss") + " ~ " + dayjs(event.end).format("HH:mm:ss") + " (" + timeDifferenceString + ")";
        tooltipElement.appendChild(timeElement);

        addTooltip(boxElement, tooltipElement);
        addHoverColor(boxElement, COLOR_SELECTED_EVENT);
    };

    export function loadSingle() {
        const mesLegend = MesLegend();
        mesLegend.create(document.getElementById("legend-container"), legendData);
        mesLegend.render();


        const container = document.getElementById("tc-container");
        const data: Services.TimelineChart.ChartData =
        {
            entities: entitiesX100 as any,
            sidePointEvents: sidePointEvents as any,
            globalRangeEvents: globalRangeEvents as any,
        };
        const cellMinutes = 30;
        const cellWidth = 30;
        const cellHeight = 30;
        const options: Services.TimelineChart.ChartOptions = {
            mainTitle: "XXX H/L LH Line 03",
            subTitle: "Serial No.",
            headerTitle: "Time Line",
            chartStartTime: new Date(Date.parse("2020-01-01T00:00:00")),
            chartEndTime: new Date(Date.parse("2020-01-01T18:00:00")),
            timelineTitleHeight: cellHeight,
            timelineHeaderHeight: cellHeight,
            timelineCanvasHeight: cellHeight,
            timelineCanvasContentHeightRatio: 0.5,
            cellMinutes: cellMinutes,
            cellWidth: cellWidth,
            cellHeight: cellHeight,
            paddingCellCount: 1,
            cellContentHeightRatio: 0.5,
            minCellWidth: 1,
            maxCellWidth: 300,
            maxResizeScale: 10,
            chartHeightAutoFit: true,
            hasHorizontalLine: true,
            hasVerticalLine: true,
            sidePointEventRender: sidePointEventRender,
            entityRender: null,
            entityPointEventRender: entityPointEventRender,
            entityRangeEventRender: entityRangeEventRender,
            headerCellRender: headerCellRender,
            globalRangeEventRender: globalRangeEventRender,
            columnAutoWidth: true
        };

        const dataOptions: Services.TimelineChart.ChartDataOptions = {
            entityNameProp: "name",
            entityPointEventsProp: "pointEvents",
            entityRangeEventsProp: "rangeEvents",
            pointEventTimeProp: "time",
            rangeEventStartTimeProp: "start",
            rangeEventEndTimeProp: "end",

        };

        const chart = Services.TimelineChart.TimelineChart();
        chart.create(container, data, options, dataOptions);
        chart.render();
    }
}

window.addEventListener("load", () => {
    Services.TimelineChart.Samples.SingleMesSample.loadSingle();
});
