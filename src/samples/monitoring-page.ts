namespace Pages.Monitoring {
    declare var Tabby: any;
    const lotErrorTypes = ["Quality", "Safety"] as const;
    type LotErrorType = typeof lotErrorTypes[number];

    const lotOperationTypes = ["op1", "op2", "op3", "op4"] as const;
    type LotOperationType = typeof lotOperationTypes[number];

    const sideErrorTypes = ["Man", "Delivery", "Cost"] as const;
    type SideErrorType = typeof sideErrorTypes[number];

    const globalErrorTypes = ["Downtime", "Network"] as const;
    type GlobalErrorType = typeof globalErrorTypes[number];

    const lotOperationClasses = {
        op1: "pl-op1",
        op2: "pl-op2",
        op3: "pl-op3",
        op4: "pl-op4",
        op5: "pl-op5",
    }

    interface Lot {
        number: string;
        product: string;
        errors: LotError[];
        operations: LotOperation[];
    }

    interface LotError {
        time: Date;
        type: LotErrorType;
    }
    interface LotOperation {
        startTime: Date;
        endTime: Date;
        type: LotOperationType;
    }

    interface SideError {
        time: Date;
        type: SideErrorType;
    }

    interface GlobalError {
        startTime: Date;
        endTime: Date;
        type: GlobalErrorType;
    }

    interface ChartState {
        index: number;
        startTime: Date;
        endTime: Date;
        lots: Lot[];
    }

    const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
    const getRandomLots = (count: number, startTime: number) => {
        const lots: Lot[] = [];
        let time = startTime;
        for (let i = 0; i < count; i++) {
            let operationTime = time;
            let errorTime = time;
            console.log("time", time);
            const lot: Lot = {
                number: `20240101000${i}`,
                product: `P12${i % 10}`,
                operations: Array.from({ length: 5 }).map((value, idx) => {
                    const startTime = operationTime;
                    const endTime = getRandom(operationTime + 1, operationTime + 2);
                    const gap = getRandom(0, 1);
                    operationTime = endTime + gap;
                    return {
                        startTime: new Date(2024, 0, 1, Math.floor(startTime / 60), startTime % 60, 0, 0),
                        endTime: new Date(2024, 0, 1, Math.floor(endTime / 60), endTime % 60, 0, 0),
                        type: lotOperationTypes[Math.floor(Math.random() * lotOperationTypes.length) % lotOperationTypes.length] as any
                    }
                }),
                errors: Array.from({ length: 3 }).map((value, idx) => {
                    errorTime = getRandom(errorTime, errorTime + 10);
                    return {
                        time: new Date(2024, 0, 1, Math.floor(time / 60), errorTime % 60, 0, 0),
                        type: lotErrorTypes[Math.floor(Math.random() * lotErrorTypes.length) % lotErrorTypes.length] as any
                    }
                }),
            }
            lots.push(lot);
            time = operationTime + 5;
        }
        lots.sort((a, b) => b.operations[0].startTime.getTime() - a.operations[0].startTime.getTime());
        return lots;
    };

    const sideErrors: SideError[] = [
        {
            time: new Date(2024, 0, 1, 6, 10, 0, 0),
            type: "Man"
        },
        {
            time: new Date(2024, 0, 1, 7, 10, 0, 0),
            type: "Man"
        },
        {
            time: new Date(2024, 0, 1, 8, 32, 0, 0),
            type: "Delivery"
        },
        {
            time: new Date(2024, 0, 1, 8, 44, 0, 0),
            type: "Cost"
        },
        {
            time: new Date(2024, 0, 1, 9, 40, 0, 0),
            type: "Man"
        },

    ];

    const globalErrors: GlobalError[] = [
        {
            startTime: new Date(2024, 0, 1, 6, 10, 0, 0),
            endTime: new Date(2024, 0, 1, 6, 30, 0, 0),
            type: "Downtime"
        },
        {
            startTime: new Date(2024, 0, 1, 7, 0, 0, 0),
            endTime: new Date(2024, 0, 1, 8, 20, 0, 0),
            type: "Network"
        },
        {
            startTime: new Date(2024, 0, 1, 10, 0, 0, 0),
            endTime: new Date(2024, 0, 1, 12, 0, 0, 0),
            type: "Downtime"
        },
        {
            startTime: new Date(2024, 0, 1, 14, 0, 0, 0),
            endTime: new Date(2024, 0, 1, 16, 20, 0, 0),
            type: "Network"
        },
    ]
    const ERROR_IMG_SRC = "./asset/image/error.svg";
    const WARNING_IMG_SRC = "./asset/image/warning.svg";

    interface WorkCenterChart {
        contentEl: HTMLElement;
        workCenter: string;
        chart: ReturnType<typeof Services.PlumChart.PlumChart>;
        chartIdx: number;
        tabIdx: number;
    }

    const chartStateList: ChartState[] = [];

    window.addEventListener("DOMContentLoaded", () => {
        const workCenters = [
            "G001",
            "G002",
            "G003",
            "G004",
            "B001",
            "B002",
            "G003",
            "B004",
            "S001",
            "S002",
            "S003",
        ];
        const timers = workCenters.map((workCenter) => null);
        const tabCount = workCenters.length / 4;
        const tabbyEl = document.querySelector(".tabby");
        const workCenterCharts: WorkCenterChart[] = [];
        for (let tabIndex = 0; tabIndex < tabCount; tabIndex++) {
            const tab = document.createElement("li");
            tab.innerHTML = `<a href="#tab-${tabIndex}">${tabIndex + 1}</a>`;
            if (tabIndex == 0) {
                tab.setAttribute("data-tabby-default", "");
            }
            tabbyEl.appendChild(tab);

            const tabContentList = document.querySelector(".tab-content-list");
            const tabContent = document.createElement("div");
            tabContent.classList.add("tab-content");
            tabContent.id = `tab-${tabIndex}`;
            tabContentList.appendChild(tabContent);

            for (let i = 0; i < 4; i++) {
                const workCenterIdx = tabIndex * 4 + i;
                if (workCenterIdx >= workCenters.length) {
                    break;
                }
                const workCenterDiv = document.createElement("div");
                workCenterDiv.classList.add("work-center");
                workCenterDiv.classList.add("work-center-" + i);
                workCenterDiv.onmouseenter = () => { workCenterDiv.style.zIndex = "100"; };
                workCenterDiv.onmouseleave = () => { workCenterDiv.style.zIndex = "0"; };
                tabContent.appendChild(workCenterDiv);


                workCenterCharts.push({
                    contentEl: tabContent,
                    workCenter: workCenters[tabIndex],
                    tabIdx: tabIndex,
                    chart: null,
                    chartIdx: workCenterIdx,
                });

                renderChart(workCenterIdx, workCenterDiv);
            }
        }

        var tabs = new Tabby('.tabby');
        document.addEventListener('tabby', function (event: CustomEvent) {
            const previousContent = event.detail.previousContent;
            const content = event.detail.content;

            if (previousContent != null) {
                const prevTabIndex = workCenterCharts.find(x => x.contentEl == previousContent).tabIdx;
                stopTimer(prevTabIndex);
            }

            const tabIndex = workCenterCharts.find(x => x.contentEl == content).tabIdx;
            startTimer(tabIndex);
        }, false);

        tabs.toggle("tab-0");

        function startTimer(tabIndex: number) {
            const workCenterIdxMin = tabIndex * 4;
            const workCenterIdxMax = workCenterIdxMin + 4;
            for (let workCenterIdx = workCenterIdxMin; workCenterIdx < workCenterIdxMax; workCenterIdx++) {
                if (workCenters.length <= workCenterIdx)
                    break;

                const chart = workCenterCharts.find(x => x.chartIdx == workCenterIdx).chart;
                let tick = 0;
                // chart.renderCanvas();
                setTimeout(() => {
                    chart.renderCanvas();
                    console.log("render chart at " + workCenterIdx);
                }, 500);
                timers[workCenterIdx] = setInterval(() => {
                    const chartState = chartStateList[workCenterIdx];
                    tick++;
                    if (30 < tick) {
                        tick = 0;
                        const lots = chartState.lots;
                        const newLot = getRandomLots(1, chartState.startTime.getTime() / 1000 * 60)[0];
                        chartState.lots = [newLot, ...lots];
                    }

                    const chartStartTime = chartState.startTime;
                    chartStartTime.setMinutes(chartStartTime.getMinutes() + 1);
                    const chartEndTime = chartState.endTime;
                    chartEndTime.setMinutes(chartEndTime.getMinutes() + 1);

                    chartState.startTime = chartStartTime;
                    chartState.endTime = chartEndTime;

                    const data = chart.getCoreChart().getData();

                    data.entities = chartState.lots.map(lot => ({
                        number: lot.number,
                        product: lot.product,
                        pointEvents: lot.errors.map(error => {
                            const pointEvent: Services.PlumChart.PointEvent = {
                                time: error.time,
                                title: error.type,
                                icon: error.type === "Quality" ? ERROR_IMG_SRC : WARNING_IMG_SRC,
                                showTooltip: true,
                                showTime: true,
                                lines: [
                                    "Lot Number: " + lot.number,
                                    "Product: " + lot.product,
                                ],
                                lazyLines: () => {
                                    return new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            const lines = Array.from({ length: 3 }).map(() => "Lazy: " + new Date());
                                            resolve(lines);
                                        }, 500);
                                    });
                                }
                            }
                            return pointEvent;
                        }),
                        rangeEvents: lot.operations.map(operation => {
                            const rangeEvent: Services.PlumChart.RangeEvent = {
                                title: operation.type,
                                startTime: operation.startTime,
                                endTime: operation.endTime,
                                className: lotOperationClasses[operation.type],
                                showTooltip: true,
                                showTime: true,
                                lines: [
                                    "Lot Number: " + lot.number,
                                    "Product: " + lot.product,
                                ],
                                lazyLines: () => {
                                    return new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            const lines = Array.from({ length: 50 }).map(() => "Lazy: " + new Date());
                                            resolve(lines);
                                        }, 500);
                                    });
                                },
                            }
                            return rangeEvent;
                        })
                    }));
                    chart.getCoreChart().setChartTimeRange(chartStartTime, chartEndTime);
                    chart.renderCanvas();
                }, 1000);
            }
        }

        function stopTimer(tabIndex: number) {
            console.log("stop timer at " + tabIndex);
            const workCenterIdxMin = tabIndex * 4;
            const workCenterIdxMax = workCenterIdxMin + 4;
            for (let workCenterIdx = workCenterIdxMin; workCenterIdx < workCenterIdxMax; workCenterIdx++) {
                const timer = timers[workCenterIdx];
                if (timer) {
                    clearInterval(timer);
                }
            }
        }

        function renderChart(index: number, containerEl: HTMLElement) {
            const plumChart = Services.PlumChart.PlumChart();
            plumChart.create(containerEl);

            workCenterCharts.find(x => x.chartIdx == index).chart = plumChart;

            const l1 = lotOperationTypes.map(type => ({
                label: type,
                className: lotOperationClasses[type],
            }));
            const l2 = lotErrorTypes.map(type => ({
                label: type,
                icon: WARNING_IMG_SRC,
            }));
            const l3 = sideErrorTypes.map(type => ({
                label: type,
                icon: ERROR_IMG_SRC,
                location: "right" as const
            }));
            const l4 = globalErrorTypes.map(type => ({
                label: type,
                className: type === "Downtime" ? "pl-downtime" : "pl-network",
                location: "right" as const
            }));
            const legends: Services.PlumChart.Legend[] = [...l1, ...l2, ...l3, ...l4];

            const options = new Services.PlumChart.PlumChartOptions();
            const optionsSource: Services.PlumChart.PlumChartOptions = {
                useEventHoverColor: true,
                eventHoverColor: '#ccc',
                gridColumns: [{
                    field: 'number',
                    caption: 'Lot Number',
                },
                {
                    field: 'product',
                    caption: 'Product',
                }],
                gridTitle: index.toString(),
                canvasTitle: 'Lot Status',
                chartStartTime: new Date(2024, 0, 1, 6, 0, 0, 0),
                chartEndTime: new Date(2024, 0, 1, 8, 0, 0, 0),
                columnAutoWidth: true
            }
            chartStateList.push({
                index: index,
                startTime: optionsSource.chartStartTime,
                endTime: optionsSource.chartEndTime,
                lots: getRandomLots(20, 6 * 60),
            });

            Object.assign(options, optionsSource);
            plumChart.setOptions(options);
            plumChart.setData({
                legends: legends,
                entities: chartStateList[index].lots.map(lot => ({
                    number: lot.number,
                    product: lot.product,
                    pointEvents: lot.errors.map(error => {
                        const pointEvent: Services.PlumChart.PointEvent = {
                            time: error.time,
                            title: error.type,
                            icon: error.type === "Quality" ? ERROR_IMG_SRC : WARNING_IMG_SRC,
                            showTooltip: true,
                            showTime: true,
                            lines: [
                                "Lot Number: " + lot.number,
                                "Product: " + lot.product,
                            ],
                            lazyLines: () => {
                                return new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const lines = Array.from({ length: 3 }).map(() => "Lazy: " + new Date());
                                        resolve(lines);
                                    }, 500);
                                });
                            }
                        }
                        return pointEvent;
                    }),
                    rangeEvents: lot.operations.map(operation => {
                        const rangeEvent: Services.PlumChart.RangeEvent = {
                            title: operation.type,
                            startTime: operation.startTime,
                            endTime: operation.endTime,
                            className: lotOperationClasses[operation.type],
                            showTooltip: true,
                            showTime: true,
                            lines: [
                                "Lot Number: " + lot.number,
                                "Product: " + lot.product,
                            ],
                            lazyLines: () => {
                                return new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const lines = Array.from({ length: 50 }).map(() => "Lazy: " + new Date());
                                        resolve(lines);
                                    }, 500);
                                });
                            },
                        }
                        return rangeEvent;
                    })
                })),
                sidePointEvents: sideErrors.map(error => {
                    const pointEvent: Services.PlumChart.PointEvent = {
                        time: error.time,
                        title: error.type,
                        icon: error.type === "Man" ? ERROR_IMG_SRC : WARNING_IMG_SRC,
                        showTooltip: true,
                        showTime: true,
                        lines: [
                            "Side Error",
                        ],
                        lazyLines: () => {
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const lines = Array.from({ length: 5 }).map(() => "Lazy: " + new Date());
                                    resolve(lines);
                                }, 500);
                            });
                        }
                    }
                    return pointEvent;
                }),
                globalRangeEvents: globalErrors.map(error => {
                    const rangeEvent: Services.PlumChart.RangeEvent = {
                        title: error.type,
                        startTime: error.startTime,
                        endTime: error.endTime,
                        className: error.type === "Downtime" ? "pl-downtime" : "pl-network",
                        showTooltip: true,
                        showTime: true,
                        lines: [
                            "Global Error",
                        ],
                        lazyLines: () => {
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    resolve([
                                        "Lazy: " + new Date(),
                                    ]);
                                }, 500);
                            });
                        },
                    }
                    return rangeEvent;
                })
            });
            plumChart.render();
        }



    });



}


