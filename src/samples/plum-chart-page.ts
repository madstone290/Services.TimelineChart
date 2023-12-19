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

const getRandomHour = () => Math.floor(Math.random() * 24);
const getRandomMinute = () => Math.floor(Math.random() * 60);

const lots: Lot[] = [];
for (let i = 0; i < 100; i++) {
    const lot: Lot = {
        number: `20240101000${i}`,
        product: `P12${i % 10}`,
        errors: [
            {
                time: new Date(2024, 0, 1, getRandomHour(), getRandomMinute(), 0, 0),
                type: lotErrorTypes[Math.floor(Math.random() * lotErrorTypes.length) % lotErrorTypes.length] as any
            },
            {
                time: new Date(2024, 0, 1, getRandomHour(), getRandomMinute(), 0, 0),
                type: lotErrorTypes[Math.floor(Math.random() * lotErrorTypes.length) % lotErrorTypes.length] as any
            },
        ],
        operations: Array.from({ length: 5 }).map(() => {
            const hour = getRandomHour();
            const minute = getRandomMinute();
            return {
                startTime: new Date(2024, 0, 1, hour, minute, 0, 0),
                endTime: new Date(2024, 0, 1, hour + 1, minute, 0, 0),
                type: lotOperationTypes[Math.floor(Math.random() * lotOperationTypes.length) % lotOperationTypes.length] as any
            }
        })
    }
    lots.push(lot);
}
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

window.addEventListener("DOMContentLoaded", () => {
    const plumChart = Services.PlumChart.create(document.getElementById('root-container'));


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
        gridTitle: 'Lot Information',
        canvasTitle: 'Lot Status',
        chartStartTime: new Date(2024, 0, 1, 0, 0, 0, 0),
        chartEndTime: new Date(2024, 0, 1, 24, 0, 0, 0),
    }
    Object.assign(options, optionsSource);
    plumChart.setOptions(options);
    plumChart.setData({
        legends: legends,
        entities: lots.map(lot => ({
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
                                resolve([
                                    "Lazy: " + new Date(),
                                ]);
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
                                resolve([
                                    "Lazy: " + new Date(),
                                ]);
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
                            resolve([
                                "Lazy: " + new Date(),
                            ]);
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
});



