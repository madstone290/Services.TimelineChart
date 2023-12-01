declare var dayjs: any;

namespace Services.TimelineChart.Samples.StyledSample {
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
        type: "op10" | "op20" | "op30" | "op40" | "op50" | "op60" | "op70" | "op80" | "op90" | "op100" | "op110" | "op120" | "op130" | "op140" | "op150";
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
        leftItems: [
            { color: "#57247a", label: "Op 10" },
            { color: "#f1a83a", label: "Op 20" },
            { color: "#77bc57", label: "Op 30" },
            { color: "#ff8fd3", label: "Op 40" },
            { color: "#d7bdff", label: "Op 50" },
            { color: "#2500c7", label: "Op 60" },
            { color: "#445735", label: "Op 70" },
            { color: "#296080", label: "Op 80" },
            { color: "#ff7526", label: "Op 90" },
            { color: "#5391ff", label: "Op 100" },
            { color: "#ff4199", label: "Op 110" },
            { color: "#8d3f59", label: "Op 120" },
            { color: "#94deeb", label: "Op 130" },
            { color: "#8866d3", label: "Op 140" },
            { color: "#bb9f7b", label: "Op 150" }
        ],
        rightItems: [
            { color: "#d9d9d9", label: "계획정지" },
            { color: "#E7FF26", label: "비가동" },
            { color: "#FF1100", label: "네트워크이상" },
            { color: "#044180", label: "바코드누락" },
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
                    time: new Date(Date.parse("2020-01-01T04:45:00")),
                    entityId: 1,
                }
            ],
            rangeEvents: [
                {
                    type: "op10",
                    start: new Date(Date.parse("2020-01-01T01:00:50")),
                    end: new Date(Date.parse("2020-01-01T01:20:00")),
                    entityId: 1,
                },
                {
                    type: "op20",
                    start: new Date(Date.parse("2020-01-01T01:20:00")),
                    end: new Date(Date.parse("2020-01-01T01:40:00")),
                    entityId: 1,
                },
                {
                    type: "op30",
                    start: new Date(Date.parse("2020-01-01T01:40:00")),
                    end: new Date(Date.parse("2020-01-01T02:00:00")),
                    entityId: 1,
                },
                {
                    type: "op40",
                    start: new Date(Date.parse("2020-01-01T02:10:00")),
                    end: new Date(Date.parse("2020-01-01T02:30:00")),
                    entityId: 1,
                },
                {
                    type: "op50",
                    start: new Date(Date.parse("2020-01-01T02:40:00")),
                    end: new Date(Date.parse("2020-01-01T03:00:00")),
                    entityId: 1,
                },
                {
                    type: "op60",
                    start: new Date(Date.parse("2020-01-01T03:10:00")),
                    end: new Date(Date.parse("2020-01-01T03:30:00")),
                    entityId: 1,
                },
                {
                    type: "op70",
                    start: new Date(Date.parse("2020-01-01T03:40:00")),
                    end: new Date(Date.parse("2020-01-01T04:00:00")),
                    entityId: 1,
                },
                {
                    type: "op80",
                    start: new Date(Date.parse("2020-01-01T04:10:00")),
                    end: new Date(Date.parse("2020-01-01T04:30:00")),
                    entityId: 1,
                },
                {
                    type: "op90",
                    start: new Date(Date.parse("2020-01-01T04:40:00")),
                    end: new Date(Date.parse("2020-01-01T04:50:00")),
                    entityId: 1,
                },
                {
                    type: "op100",
                    start: new Date(Date.parse("2020-01-01T05:10:00")),
                    end: new Date(Date.parse("2020-01-01T05:20:00")),
                    entityId: 1,
                },
                {
                    type: "op110",
                    start: new Date(Date.parse("2020-01-01T05:30:00")),
                    end: new Date(Date.parse("2020-01-01T05:40:00")),
                    entityId: 1,
                },
                {
                    type: "op120",
                    start: new Date(Date.parse("2020-01-01T06:10:00")),
                    end: new Date(Date.parse("2020-01-01T06:20:00")),
                    entityId: 1,
                },
                {
                    type: "op130",
                    start: new Date(Date.parse("2020-01-01T06:30:00")),
                    end: new Date(Date.parse("2020-01-01T06:40:00")),
                    entityId: 1,
                },
                {
                    type: "op140",
                    start: new Date(Date.parse("2020-01-01T07:50:00")),
                    end: new Date(Date.parse("2020-01-01T08:00:00")),
                    entityId: 1,
                },
                {
                    type: "op150",
                    start: new Date(Date.parse("2020-01-01T08:00:00")),
                    end: new Date(Date.parse("2020-01-01T08:300:00")),
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
            time: new Date(Date.parse("2020-01-01T08:30:00")),
        },
        {
            id: 3,
            description: "온수기 이상",
            time: new Date(Date.parse("2020-01-01T09:00:00")),
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
        ["op10", "#57247a"],
        ["op20", "#f1a83a"],
        ["op30", "#77bc57"],
        ["op40", "#ff8fd3"],
        ["op50", "#d7bdff"],
        ["op60", "#2500c7"],
        ["op70", "#445735"],
        ["op80", "#296080"],
        ["op90", "#ff7526"],
        ["op100", "#5391ff"],
        ["op110", "#ff4199"],
        ["op120", "#8d3f59"],
        ["op130", "#94deeb"],
        ["op140", "#8866d3"],
        ["op150", "#bb9f7b"]
    ]);
    const globalRangeEventColors = new Map([
        ["pause", "#d9d9d9"],
        ["fault", "#E7FF26"],
        ["networkError", "#FF1100"],
        ["barcodeMissing", "#044180"]
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
    const CLS_COLUMN_HEADER_CELL = "tr-column-header-cell";
    const CLS_ENTITY_POINT_EVENT_BOX = "tr-entity-point-event-box";
    const CLS_ENTITY_POINT_EVENT_TOOLTIP = "tr-entity-point-event-tooltip";
    const CLS_ENTITY_POINT_EVENT_TITLE = "tr-entity-point-event-title";
    const CLS_ENTITY_POINT_EVENT_COLOR_ICON = "tr-entity-point-event-color-icon";

    const CLS_ENTITY_RANGE_EVENT_BOX = "tr-entity-range-event-box";
    const CLS_ENTITY_RANGE_EVENT_TOOLTIP = "tr-entity-range-event-tooltip";
    const CLS_ENTITY_RANGE_EVENT_TITLE = "tr-entity-range-event-title";
    const CLS_ENTITY_RANGE_EVENT_COLOR_ICON = "tr-entity-range-event-color-icon";


    const CLS_SIDE_POINT_EVENT_BOX = "tr-side-point-event-box";
    const CLS_SIDE_POINT_EVENT_TOOLTIP = "tr-side-point-event-tooltip";
    const CLS_SIDE_POINT_EVENT_TITLE = "tr-side-point-event-title";
    const CLS_SIDE_POINT_EVENT_COLOR_ICON = "tr-side-point-event-color-icon";

    const CLS_GLOBAL_RANGE_EVENT_BOX = "tr-global-range-event-box";
    const CLS_GLOBAL_RANGE_EVENT_TOOLTIP = "tr-global-range-event-tooltip";
    const CLS_GLOBAL_RANGE_EVENT_TITLE = "tr-global-range-event-title";
    const CLS_GLOBAL_RANGE_EVENT_COLOR_ICON = "tr-global-range-event-color-icon";


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
        divElement.classList.add(CLS_COLUMN_HEADER_CELL);
        divElement.innerText = dayjs(time).format("HH:mm");
        containerElement.appendChild(divElement);
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
        imgElement.classList.add(CLS_ENTITY_POINT_EVENT_BOX);
        imgElement.src = ERROR_IMG_SRC;
        containerElement.appendChild(imgElement);

        const tooltipElement = document.createElement("div");
        tooltipElement.classList.add(CLS_TOOLTIP);
        tooltipElement.classList.add(CLS_ENTITY_POINT_EVENT_TOOLTIP);
        canvasElement.appendChild(tooltipElement);

        const titleElement = document.createElement("div");
        titleElement.classList.add(CLS_ENTITY_POINT_EVENT_TITLE);
        titleElement.innerText = "품질 이상";
        tooltipElement.appendChild(titleElement);

        const colorIconElement = document.createElement("div");
        colorIconElement.classList.add(CLS_ENTITY_POINT_EVENT_COLOR_ICON);
        tooltipElement.appendChild(colorIconElement);

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
        boxElement.classList.add(CLS_ENTITY_RANGE_EVENT_BOX);
        boxElement.style.backgroundColor = entityRangeEventColors.get(event.type);
        containerElement.appendChild(boxElement);

        const tooltipElement = document.createElement("div");
        tooltipElement.classList.add(CLS_TOOLTIP);
        tooltipElement.classList.add(CLS_ENTITY_RANGE_EVENT_TOOLTIP);
        tooltipElement.style.borderColor = entityRangeEventColors.get(event.type);
        canvasElement.appendChild(tooltipElement);

        const titleElement = document.createElement("div");
        titleElement.classList.add(CLS_ENTITY_RANGE_EVENT_TITLE);
        titleElement.innerText = event.type;
        tooltipElement.appendChild(titleElement);

        const colorIconElement = document.createElement("div");
        colorIconElement.classList.add(CLS_ENTITY_RANGE_EVENT_COLOR_ICON);
        colorIconElement.style.borderTopColor = entityRangeEventColors.get(event.type);
        colorIconElement.style.borderLeftColor = entityRangeEventColors.get(event.type);
        tooltipElement.appendChild(colorIconElement);

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
        imgElement.classList.add(CLS_SIDE_POINT_EVENT_BOX);
        imgElement.src = WARNING_IMG_SRC;
        containerElement.appendChild(imgElement);

        const tooltipElement = document.createElement("div");
        tooltipElement.classList.add(CLS_TOOLTIP);
        tooltipElement.classList.add(CLS_SIDE_POINT_EVENT_TOOLTIP);
        canvasElement.appendChild(tooltipElement);

        const titleElement = document.createElement("div");
        titleElement.classList.add(CLS_SIDE_POINT_EVENT_TITLE);
        titleElement.innerText = "설비 이상";
        tooltipElement.appendChild(titleElement);

        const colorIcon = document.createElement("div");
        colorIcon.classList.add(CLS_SIDE_POINT_EVENT_COLOR_ICON);
        tooltipElement.appendChild(colorIcon);

        const descElement = document.createElement("div");
        descElement.innerText = (event as any).description;
        tooltipElement.appendChild(descElement);

        const timeElement = document.createElement("div");
        timeElement.innerText = dayjs(event.time).format("HH:mm:ss");
        tooltipElement.appendChild(timeElement);

        addTooltip(imgElement, tooltipElement);
        addHoverColor(imgElement, COLOR_SELECTED_EVENT);
    };

    const globalRangeEventRender = function (event: any, canvasElement: HTMLElement, containerElement: HTMLElement) {
        const boxElement = document.createElement("div");
        boxElement.classList.add(CLS_GLOBAL_RANGE_EVENT_BOX);
        boxElement.style.backgroundColor = globalRangeEventColors.get(event.type);
        containerElement.appendChild(boxElement);

        const tooltipElement = document.createElement("div");
        tooltipElement.classList.add(CLS_TOOLTIP);
        tooltipElement.classList.add(CLS_GLOBAL_RANGE_EVENT_TOOLTIP);
        tooltipElement.style.borderColor = globalRangeEventColors.get(event.type);
        canvasElement.appendChild(tooltipElement);

        const typeElement = document.createElement("div");
        typeElement.classList.add(CLS_GLOBAL_RANGE_EVENT_TITLE);
        typeElement.innerText = globalRangeEventNames.get(event.type);
        tooltipElement.appendChild(typeElement);

        const colorIconElement = document.createElement("div");
        colorIconElement.classList.add(CLS_GLOBAL_RANGE_EVENT_COLOR_ICON);
        colorIconElement.style.borderTopColor = globalRangeEventColors.get(event.type);
        colorIconElement.style.borderLeftColor = globalRangeEventColors.get(event.type);
        tooltipElement.appendChild(colorIconElement);

        const timeDifference = getTimeDiff(event.start, event.end);
        const timeDifferenceString = getTimeDiffString(timeDifference);
        const timeElement = document.createElement("div");
        timeElement.innerText = dayjs(event.start).format("HH:mm:ss") + " ~ " + dayjs(event.end).format("HH:mm:ss") + " (" + timeDifferenceString + ")";
        tooltipElement.appendChild(timeElement);

        addTooltip(boxElement, tooltipElement);
        addHoverColor(boxElement, COLOR_SELECTED_EVENT);
    };

    const mainTitleRender = function (containerElement: HTMLElement) {
        containerElement.classList.add("tr-main-title");
        containerElement.innerHTML = "ABC H/L LH Line 03";
    }

    const tableColumnRender = function (containerElement: HTMLElement) {
        const box = document.createElement("div");
        box.classList.add("tr-table-column-box");
        containerElement.appendChild(box);

        const item1 = document.createElement("div");
        item1.classList.add("tr-table-column-item");
        item1.innerText = "Sequnce No.";
        box.appendChild(item1);

        const item2 = document.createElement("div");
        item2.classList.add("tr-table-column-item");
        item2.innerText = "Lot No.";
        box.appendChild(item2);
    }

    const tableRowRender = function (entity: any, containerElement: HTMLElement) {
        containerElement.classList.add("tr-table-row-box");

        const item1 = document.createElement("div");
        item1.classList.add("tr-table-row-item");
        item1.innerText = entity.id;
        containerElement.appendChild(item1);

        const item2 = document.createElement("div");
        item2.classList.add("tr-table-row-item");
        item2.innerText = entity.name;
        containerElement.appendChild(item2);
    }

    const columnTitleRender = function (containerElement: HTMLElement) {
        containerElement.classList.add("tr-column-title");
        containerElement.innerText = "ABC TIME LINE";
    }

    export function loadSingle() {
        const mesLegend = ChartLegend();
        mesLegend.create(document.getElementById("legend-container"));
        mesLegend.setData(legendData);
        mesLegend.render();

        const container = document.getElementById("tc-container");
        const data: Services.TimelineChart.ChartData =
        {
            entities: entitiesX100.map(entity => {
                const shapedEntity: Entity = {
                    ...entity,
                    pointEvents: entity.pointEvents?.map((pointEvent: any): PointEvent => {
                        return {
                            ...pointEvent,
                            time: pointEvent.time,
                        }
                    }),
                    rangeEvents: entity.rangeEvents?.map((rangeEvent: any): RangeEvent => {
                        return {
                            ...rangeEvent,
                            startTime: rangeEvent.start,
                            endTime: rangeEvent.end,
                        }
                    })
                };
                return shapedEntity;
            }),
            sidePointEvents: sidePointEvents as any,
            globalRangeEvents: globalRangeEvents.map((globalRangeEvent: any): RangeEvent => {
                return {
                    ...globalRangeEvent,
                    startTime: globalRangeEvent.start,
                    endTime: globalRangeEvent.end,
                }
            })
        };
        const cellMinutes = 10;
        const cellWidth = 100;
        const cellHeight = 30;
        const options: Services.TimelineChart.ChartOptions = {
            mainTitle: "XXX H/L LH Line 03",
            //subTitle: "Serial No.",
            columnTitle: "Time Line",
            chartStartTime: new Date(Date.parse("2020-01-01T06:00:00")),
            chartEndTime: new Date(Date.parse("2020-01-01T18:00:00")),
            columnTitleHeight: cellHeight,
            columnHeaderHeight: cellHeight,
            sideCanvasHeight: cellHeight,
            sideCanvasContentHeightRatio: 0.5,
            cellMinutes: cellMinutes,
            cellWidth: cellWidth,
            cellHeight: cellHeight,
            paddingCellCount: 1,
            leftPanelWidth: 300,
            cellContentHeightRatio: 0.5,
            maxZoomScale: 5,
            hasHorizontalLine: true,
            hasVerticalLine: true,
            sidePointEventRender: sidePointEventRender,
            tableRowRender: tableRowRender,
            entityPointEventRender: entityPointEventRender,
            entityRangeEventRender: entityRangeEventRender,
            headerCellRender: headerCellRender,
            globalRangeEventRender: globalRangeEventRender,
            columnAutoWidth: true,
            vZoomEnabled: false,
            mainTitleRender: mainTitleRender,
            tableColumnRender: tableColumnRender,
            columnTitleRender: columnTitleRender,
            rowHoverColor: "#ccc",
            fabScrollStep: 200
        };

        const chart = Services.TimelineChart.TimelineChart();
        chart.create(container);
        chart.setData(data);
        chart.setOptions(options);
        chart.render();
    }
}

window.addEventListener("load", () => {
    Services.TimelineChart.Samples.StyledSample.loadSingle();
});
