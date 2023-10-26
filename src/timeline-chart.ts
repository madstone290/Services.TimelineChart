namespace Services.TimelineChart {

    /**
     * 차트 이벤트.
     */
    export interface PointEvent {
        [key: string]: any;
        time: Date;
    }

    export interface RangeEvent {
        [key: string]: any;
        startTime: Date;
        endTime: Date;
    }

    export interface Entity {
        [key: string]: any;
        name: string;
        pointEvents: PointEvent[];
        rangeEvents: RangeEvent[];
    }

    export interface ChartData {

        entities: Entity[];

        /**
         * 사이드캔버스에 표시할 이벤트
         */
        sidePointEvents: PointEvent[];

        /**
         * 메인 캔버스에 표시할 글로벌 포인트 이벤트 목록.
         */
        globalRangeEvents: RangeEvent[];
    }

    export interface ChartDataOptions {
        entityNameProp?: string;
        entityPointEventsProp?: string;
        entityRangeEventsProp?: string;
        sidePointEventTimeProp?: string;
        entityPointEventTimeProp?: string;
        entityRangeEventStartTimeProp?: string;
        entityRangeEventEndTimeProp?: string;
        globalRangeEventStartTimeProp?: string;
        globalRangeEventEndTimeProp?: string;

    }

    export interface ChartOptions {
        chartStartTime: Date;
        chartEndTime: Date;
        paddingCellCount?: number;
        mainTitle?: string;
        subTitle?: string;
        columnTitle?: string;
        leftPanelWidth?: number;
        columnTitleHeight?: number;
        columnHeaderHeight?: number;
        sideCanvasHeight?: number;
        sideCanvasContentHeightRatio?: number;
        cellMinutes?: number;
        cellWidth?: number;
        cellHeight?: number;
        minCellWidth?: number;
        minCellHeight?: number;
        maxCellWidth?: number;
        maxCellHeight?: number;
        cellContentHeightRatio?: number;
        maxZoomScale?: number;
        hasHorizontalLine?: boolean;
        hasVerticalLine?: boolean;
        zoomStepX?: number;
        zoomStepY?: number;
        /**
         * 컬럼 너비를 자동으로 맞출지 여부. true인 경우 셀너비 옵션이 무시된다. 현재 차트 너비에 맞춰 셀너비를 조절한다.
         */
        columnAutoWidth?: boolean;
        /**
        * 수평 줌 활성화 여부
        */
        hZoomEnabled?: boolean;

        /**
        * 수직 줌 활성화 여부
        */
        vZoomEnabled?: boolean;
        headerTimeFormat?: (time: Date) => string;
        headerCellRender?: (time: Date, containerEl: HTMLElement) => void;
        entityRender?: (entity: Entity, containerEl: HTMLElement) => void;
        sidePointEventRender: (event: PointEvent, canvasEl: HTMLElement, containerEl: HTMLElement) => void;
        entityPointEventRender: (event: PointEvent, canvasEl: HTMLElement, containerEl: HTMLElement) => void;
        entityRangeEventRender: (event: RangeEvent, canvasEl: HTMLElement, containerEl: HTMLElement) => void;
        globalRangeEventRender: (event: RangeEvent, canvasEl: HTMLElement, containerEl: HTMLElement) => void;
        mainTitleRender?: (containerEl: HTMLElement) => void;
        subTitleRender?: (containerEl: HTMLElement) => void;
        columnTitleRender?: (containerEl: HTMLElement) => void;
    }

    interface ChartState {
        chartStartTime: Date;
        chartEndTime: Date;
        paddingCellCount: number;
        mainTitle: string;
        subTitle: string;
        columnTitle?: string;
        leftPanelWidth: number;
        columnTitleHeight: number;
        columnHeaderHeight: number;
        sideCanvasHeight: number;
        sideCanvasContentHeightRatio: number;
        sideCanvasContentHeight: number;
        scrollWidth: number;
        cellMinutes: number;
        cellWidth: number;
        cellHeight: number;
        minCellWidth: number;
        minCellHeight: number;
        maxCellWidth: number;
        maxCellHeight: number;
        chartHeight: number;
        chartWidth: number;
        cellContentHeightRatio: number;
        cellContentHeight: number;
        headerCellCount: number;
        maxZoomScale: number;
        hasHorizontalLine: boolean;
        hasVerticalLine: boolean;
        columnAutoWidth: boolean;
        /**
        * 수평 줌 활성화 여부
        */
        hZoomEnabled: boolean;

        /**
        * 수직 줌 활성화 여부
        */
        vZoomEnabled: boolean;
        headerTimeFormat: (time: Date) => string;
        headerCellRender: (time: Date, containerElement: HTMLElement) => void;
        entityRender: (entity: Entity, containerEl: HTMLElement) => void;
        sidePointEventRender: (event: PointEvent, canvasEl: HTMLElement, containerEl: HTMLElement) => void;
        entityPointEventRender: (event: PointEvent, canvasEl: HTMLElement, containerEl: HTMLElement) => void;
        entityRangeEventRender: (event: RangeEvent, canvasEl: HTMLElement, containerEl: HTMLElement) => void;
        globalRangeEventRender: (event: RangeEvent, canvasEl: HTMLElement, containerEl: HTMLElement) => void;
        mainTitleRender: (containerEl: HTMLElement) => void;
        subTitleRender: (containerEl: HTMLElement) => void;
        columnTitleRender: (containerEl: HTMLElement) => void;
        /**
        * 차트 렌더링 시작 시간
        */
        chartRenderStartTime: Date;

        /**
         * 차트 렌더링 종료 시간
         */
        chartRenderEndTime: Date;

        /**
         * 셀 너비 조절 단위. 마우스 휠을 이용해 셀 크기를 조절할 때 사용한다.
         */
        zoomStepY: number;

        /**
         * 셀 높이 조절 단위. 마우스 휠을 이용해 셀 크기를 조절할 때 사용한다.
         */
        zoomStepX: number;

        /**
         * x축 줌 속도. 
         */
        zoomVelocityX: number;

        /**
         * y축 줌 속도.
         */
        zoomVelocityY: number;

        /**
         * 이전 줌 방향. 줌 방향이 바뀌면 가속도를 초기화한다.
         */
        prevZoomDirection: null | "in" | "out";

        /**
         * 줌 가속 초기화 시간(밀리초)
         */
        accelResetTimeout: number;
        /**
         * 최근 줌 시간. 줌 이전에 렌더링된 엘리먼트는 새로 렌더링한다.
         */
        lastZoomTime: Date;

        /**
         * 시간범위를 엄격하게 적용할지 여부. true인 경우 시간범위를 벗어나는 이벤트는 렌더링하지 않는다.
         */
        strictTimeRange: boolean;
    }

    /**
     * 엔티티 렌더링 정보
     */
    interface EntityContainer {
        index: number;
        entity: Entity;
        /**
         * 엔티티 컨테이너 엘리먼트
         */
        containerEl: HTMLElement;
        /**
         * 수평선
         */
        hLine: HTMLElement;

        /**
         * 최근 렌더링 시간
         */
        lastRenderTime: Date;
    }

    export const TimelineChart = function () {

        /* Layout
        |---------------|-------------------|
        | main title    | column title      |
        |---------------|-------------------|
        |               | column header     |
        | sub title     |-------------------|
        |               | side canvas       |
        |---------------|-------------------|
        |               |                   |
        | entity list   | main canvas       |
        |               |                   |
        |---------------|-------------------|
        */
        // #region Constants
        const CLS_ROOT = "tc-root";
        const CLS_COLUMN_TITLE = "tc-column-title";
        const CLS_COLUMN_HEADER_BOX = "tc-column-header-box";
        const CLS_COLUMN_HEADER = "tc-column-header";
        const CLS_SIDE_CANVAS_BOX = "tc-side-canvas-box";
        const CLS_SIDE_CANVAS = "tc-side-canvas";
        const CLS_COLUMN_HEADER_ITEM = "tc-column-header-item";
        const CLS_COLUMN_PANEL = "tc-column-panel";
        const CLS_LEFT_PANEL = "tc-left-panel";
        const CLS_MAIN_PANEL = "tc-main-panel";
        const CLS_MAIN_TITLE = "tc-maintitle";
        const CLS_SUBTITLE = "tc-subtitle";
        const CLS_ENTITY_LIST_BOX = "tc-entity-list-box";

        const CLS_MAIN_CANVAS_BOX = "tc-main-canvas-box";
        const CLS_MAIN_CANVAS = "tc-main-canvas";

        const CLS_ENTITY_LIST_ITEM = "tc-entity-list-item";

        const CLS_SIDE_CANVASE_V_BORDER = "tc-side-canvas-v-border";
        const CLS_SIDE_CANVAS_POINT_EVENT = "tc-side-canvas-point-event";

        const CLS_MAIN_CANVAS_H_BORDER = "tc-main-canvas-h-border";
        const CLS_MAIN_CANVAS_V_BORDER = "tc-main-canvas-v-border";
        const CLS_MAIN_CANVAS_ENTITY_POINT_EVENT = "tc-main-canvas-entity-point-event";
        const CLS_MAIN_CANVAS_ENTITY_RANGE_EVENT = "tc-main-canvas-entity-range-event";
        const CLS_MAIN_CANVAS_GLOBAL_RANGE_EVENT = "tc-main-canvas-global-range-event";


        // #endregion
        /**
        * 타임라인차트 엘리먼트
        */
        const TC_ELEMENT_HTML = `
                <div class="${CLS_ROOT}">
                    <div class="${CLS_LEFT_PANEL}">
                        <div class="${CLS_MAIN_TITLE}"></div>
                        <div class="${CLS_SUBTITLE}"></div>
                        <div class="${CLS_ENTITY_LIST_BOX}"></div>
                    </div>
                    <div class="${CLS_MAIN_PANEL}">
                        <div class="${CLS_COLUMN_PANEL}">
                            <div class="${CLS_COLUMN_TITLE}"></div>
                            <div class="${CLS_COLUMN_HEADER_BOX}">
                                <div class="${CLS_COLUMN_HEADER}"></div>
                            </div>
                            <div class="${CLS_SIDE_CANVAS_BOX}">
                                <div class="${CLS_SIDE_CANVAS}"></div>
                            </div>
        
                        </div>
                        <div class="${CLS_MAIN_CANVAS_BOX}">
                            <div class="${CLS_MAIN_CANVAS}">
                            </div>
                        </div>
                    </div>
                </div>
                `;

        let _data: ChartData;
        let _dataOptions: ChartDataOptions = {
            entityNameProp: "name",
            entityPointEventsProp: "pointEvents",
            entityRangeEventsProp: "rangeEvents",
            sidePointEventTimeProp: "time",
            entityPointEventTimeProp: "time",
            entityRangeEventStartTimeProp: "startTime",
            entityRangeEventEndTimeProp: "endTime",
            globalRangeEventStartTimeProp: "startTime",
            globalRangeEventEndTimeProp: "endTime"
        }

        let _state: ChartState = {
            chartStartTime: new Date(),
            chartEndTime: new Date(),
            paddingCellCount: 2,
            mainTitle: "",
            subTitle: "",
            leftPanelWidth: 200,
            scrollWidth: 15,
            columnTitleHeight: 40,
            columnHeaderHeight: 40,
            sideCanvasHeight: 40,
            sideCanvasContentHeightRatio: 0.8,
            cellMinutes: 30,
            cellWidth: 40,
            cellHeight: 40,
            minCellWidth: 40,
            minCellHeight: 40,
            maxCellWidth: 40 * 3,
            maxCellHeight: 40 * 3,
            chartHeight: 0,
            chartWidth: 0,
            cellContentHeightRatio: 0.8,
            maxZoomScale: 3,
            headerTimeFormat: null,
            headerCellRender: null,
            entityRender: null,
            sidePointEventRender: null,
            entityPointEventRender: null,
            entityRangeEventRender: null,
            globalRangeEventRender: null,
            hasHorizontalLine: true,
            hasVerticalLine: true,
            chartRenderStartTime: new Date(),
            chartRenderEndTime: new Date(),
            zoomStepX: 10,
            zoomStepY: 10,
            zoomVelocityX: 0,
            zoomVelocityY: 0,
            prevZoomDirection: null,
            headerCellCount: 0,
            cellContentHeight: 0,
            sideCanvasContentHeight: 0,
            lastZoomTime: new Date(),
            accelResetTimeout: 300,
            columnAutoWidth: true,
            hZoomEnabled: true,
            vZoomEnabled: false,
            mainTitleRender: null,
            subTitleRender: null,
            columnTitleRender: null,
            strictTimeRange: false
        }

        /**
         * 엔티티 컨테이너 목록. 엔티티 렌더링에 사용한다.
         */
        let _entityContainers = new Map<HTMLElement, EntityContainer>();

        /* Html Elements */
        let _rootElement: HTMLElement;
        let _mainTitleElement: HTMLElement;
        let _subTitleElement: HTMLElement;
        let _columnTitleElement: HTMLElement;

        let _entityListBoxElement: HTMLElement;

        let _columnHeaderBoxElement: HTMLElement;
        let _columnHeaderElement: HTMLElement;

        let _sideCanvasBoxElement: HTMLElement;
        let _sideCanvasElement: HTMLElement;

        let _mainCanvasBoxElement: HTMLElement;
        let _mainCanvasElement: HTMLElement;


        const dateTimeService = function () {
            function toMinutes(time: number) {
                return time / (60 * 1000);
            }
            function toTime(minutes: number) {
                return minutes * 60 * 1000;
            }
            return {
                toMinutes,
                toTime
            }
        }();

        const cssService = function () {
            const VAR_CELL_WIDTH = "--tc-cell-width";
            const VAR_CELL_HEIGHT = "--tc-cell-height";
            const VAR_CELL_CONTENT_HEIGHT = "--tc-cell-content-height";
            const VAR_SCROLL_WIDTH = "--tc-scroll-width";

            const VAR_CHART_HEIGHT = "--tc-height";
            const VAR_CHART_WIDTH = "--tc-width";

            const VAR_COLUMN_TITLE_HEIGHT = "--tc-column-title-height";
            const VAR_COLUMN_HEADER_HEIGHT = "--tc-column-header-height";
            const VAR_SIDE_CANVAS_HEIGHT = "--tc-side-canvas-height";
            const VAR_SIDE_CANVAS_CONTENT_HEIGHT = "--tc-side-canvas-content-height";

            const VAR_LEFT_PANEL_WIDTH = "--tc-list-width";
            function getVariable(name: string) {
                return getComputedStyle(_rootElement).getPropertyValue(name);
            }

            function setVariable(name: string, value: string) {
                _rootElement.style.setProperty(name, value);
            }

            function setChartWidth(width: number) {
                setVariable(VAR_CHART_WIDTH, `${width}px`);
            }

            function setLeftPanelWidth(width: number) {
                setVariable(VAR_LEFT_PANEL_WIDTH, `${width}px`);
            }

            function getChartHeight() { return parseInt(getVariable(VAR_CHART_HEIGHT)); }
            function setChartHeight(height: number) { setVariable(VAR_CHART_HEIGHT, `${height}px`); }

            function getColumnTitleHeight() { return parseInt(getVariable(VAR_COLUMN_TITLE_HEIGHT)); }
            function setColumnTitleHeight(height: number) { setVariable(VAR_COLUMN_TITLE_HEIGHT, `${height}px`); }

            function getColumnHeaderHeight() { return parseInt(getVariable(VAR_COLUMN_HEADER_HEIGHT)); }
            function setColumnHeaderHeight(height: number) { setVariable(VAR_COLUMN_HEADER_HEIGHT, `${height}px`); }

            function getSideCanvasHeight() { return parseInt(getVariable(VAR_SIDE_CANVAS_HEIGHT)); }
            function setSideCanvasHeight(height: number) { setVariable(VAR_SIDE_CANVAS_HEIGHT, `${height}px`); }

            function getSideCanvasContentHeight() { return parseInt(getVariable(VAR_SIDE_CANVAS_CONTENT_HEIGHT)); }
            function setSideCanvasContentHeight(height: number) { setVariable(VAR_SIDE_CANVAS_CONTENT_HEIGHT, `${height}px`); }

            function getColumnPanelHeight() { return getColumnTitleHeight() + getColumnHeaderHeight() + getSideCanvasHeight(); }

            function getCellWidth() { return parseInt(getVariable(VAR_CELL_WIDTH)); }
            function setCellWidth(width: number) { setVariable(VAR_CELL_WIDTH, `${width}px`); }

            function getCellHeight() { return parseInt(getVariable(VAR_CELL_HEIGHT)); }
            function setCellHeight(height: number) { setVariable(VAR_CELL_HEIGHT, `${height}px`); }

            function getCellContentHeight() { return parseInt(getVariable(VAR_CELL_CONTENT_HEIGHT)); }
            function setCellContentHeight(height: number) { setVariable(VAR_CELL_CONTENT_HEIGHT, `${height}px`); }

            function setScrollWidth(width: number) { setVariable(VAR_SCROLL_WIDTH, `${width}px`); }

            return {
                getVariable,
                setVariable,

                setLeftPanelWidth,

                setChartWidth,
                getChartHeight,
                setChartHeight,

                getColumnTitleHeight,
                setColumnTitleHeight,
                getColumnHeaderHeight,
                setColumnHeaderHeight,
                getSideCanvasHeight,
                setSideCanvasHeight,
                getSideCanvasContentHeight,
                setSideCanvasContentHeight,
                getColumnPanelHeight,

                getCellWidth,
                setCellWidth,
                getCellHeight,
                setCellHeight,
                getCellContentHeight,
                setCellContentHeight,

                setScrollWidth
            }
        }();

        /**
         * 차트 엘리먼트를 생성한다.
         * @param container 
         */
        function create(container: HTMLElement, data: ChartData, options: ChartOptions, dataOptions?: ChartDataOptions) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(TC_ELEMENT_HTML, 'text/html');
            const element = doc.body.firstChild;
            container.appendChild(element);

            _rootElement = container.getElementsByClassName(CLS_ROOT)[0] as HTMLElement;
            _mainTitleElement = container.getElementsByClassName(CLS_MAIN_TITLE)[0] as HTMLElement;
            _subTitleElement = container.getElementsByClassName(CLS_SUBTITLE)[0] as HTMLElement;
            _columnTitleElement = container.getElementsByClassName(CLS_COLUMN_TITLE)[0] as HTMLElement;
            _entityListBoxElement = container.getElementsByClassName(CLS_ENTITY_LIST_BOX)[0] as HTMLElement;
            _columnHeaderBoxElement = container.getElementsByClassName(CLS_COLUMN_HEADER_BOX)[0] as HTMLElement;
            _columnHeaderElement = container.getElementsByClassName(CLS_COLUMN_HEADER)[0] as HTMLElement;
            _sideCanvasBoxElement = container.getElementsByClassName(CLS_SIDE_CANVAS_BOX)[0] as HTMLElement;
            _sideCanvasElement = container.getElementsByClassName(CLS_SIDE_CANVAS)[0] as HTMLElement;
            _mainCanvasBoxElement = container.getElementsByClassName(CLS_MAIN_CANVAS_BOX)[0] as HTMLElement;
            _mainCanvasElement = container.getElementsByClassName(CLS_MAIN_CANVAS)[0] as HTMLElement;

            _addEventListeners();

            // 컨테이너 크기에 맞춰 차트 크기를 조정한다.
            _state.chartWidth = container.clientWidth;
            _state.chartHeight = container.clientHeight;

            setData(data);
            setOptions(options);
            setDataOptions(dataOptions);
        }

        function _addEventListeners() {
            _mainCanvasBoxElement.addEventListener("scroll", (e) => {
                _columnHeaderBoxElement.scrollLeft = _mainCanvasBoxElement.scrollLeft;
                _sideCanvasBoxElement.scrollLeft = _mainCanvasBoxElement.scrollLeft;
            });
            _mainCanvasBoxElement.addEventListener("scroll", (e) => {
                _entityListBoxElement.scrollTop = _mainCanvasBoxElement.scrollTop;
            });
            _mainCanvasElement.addEventListener("mousemove", (e) => {
                if (e.buttons === 1) {
                    _mainCanvasBoxElement.scrollLeft -= e.movementX;
                    _mainCanvasBoxElement.scrollTop -= e.movementY;
                }
            });
            _mainCanvasElement.addEventListener("mousedown", (e) => {
                document.body.style.cursor = "pointer";
            });
            _mainCanvasElement.addEventListener("mouseup", (e) => {
                document.body.style.cursor = "default";
            });

            _mainCanvasElement.addEventListener("wheel", (e) => {
                zoomCanvasWhenWheel(_mainCanvasElement, e);
            });

            _sideCanvasElement.addEventListener("wheel", (e) => {
                zoomCanvasWhenWheel(_sideCanvasElement, e);
            });

            // prevent default zoom
            document.body.addEventListener("wheel", (e) => {
                if (e.ctrlKey) {
                    e.preventDefault();
                }
            }, {
                passive: false
            });
            // change cursor when ctrl key is pressed
            document.body.addEventListener("keydown", (e) => {
                if (e.ctrlKey) {
                    document.body.style.cursor = "pointer";
                }
            });
            // restore cursor when ctrl key is released
            document.body.addEventListener("keyup", (e) => {
                document.body.style.cursor = "default";
            });
        }



        function setOptions(options: ChartOptions) {
            Object.entries(options)
                .filter(([key, value]) => value !== undefined)
                .forEach(([key, value]) => {
                    (_state as any)[key] = value;
                });
            _state.maxZoomScale = options.maxZoomScale ?? _state.maxZoomScale;

            _state.minCellWidth = options.minCellWidth ?? _state.cellWidth;
            _state.maxCellWidth = options.maxCellWidth ?? _state.cellWidth * _state.maxZoomScale;
            _state.minCellHeight = options.minCellHeight ?? _state.cellHeight;
            _state.maxCellHeight = options.maxCellHeight ?? _state.cellHeight * _state.maxZoomScale;

            _state.sideCanvasContentHeight = _state.sideCanvasContentHeightRatio * _state.sideCanvasHeight;
            _state.cellContentHeight = _state.cellContentHeightRatio * _state.cellHeight;

            _state.chartRenderStartTime = new Date(_state.chartStartTime.getTime() - dateTimeService.toTime(_state.cellMinutes * _state.paddingCellCount))
            _state.chartRenderEndTime = new Date(_state.chartEndTime.getTime() + dateTimeService.toTime(_state.cellMinutes * _state.paddingCellCount))
            _state.zoomStepX = options.zoomStepX ?? _state.cellWidth / 5;
            _state.zoomStepY = options.zoomStepY ?? _state.cellHeight / 5;

            if (_state.columnAutoWidth) {
                function outputsize() {
                    const canvasWidth = _mainCanvasBoxElement.clientWidth;
                    const cellWidth = canvasWidth / _state.headerCellCount;
                    _state.cellWidth = cellWidth;
                    _state.minCellWidth = cellWidth;
                    _state.maxCellWidth = options.maxCellWidth ?? cellWidth * _state.maxZoomScale;
                    cssService.setCellWidth(cellWidth);

                    _renderCanvas();
                }
                new ResizeObserver(outputsize).observe(_mainCanvasBoxElement)
            }

            _state.headerTimeFormat = options.headerTimeFormat ?? ((time: Date) => { return time.toLocaleString(); });
            _state.headerCellRender = options.headerCellRender ?? ((time: Date, containerElement: HTMLElement) => {
                const div = document.createElement("div");
                div.innerText = _state.headerTimeFormat(time);
                containerElement.appendChild(div);
            });
            _state.entityRender = options.entityRender ?? ((entity: Entity, containerElement: HTMLElement) => {
                const div = document.createElement("div");
                div.style.height = "100%";
                div.style.width = "100%";
                div.style.display = "flex";
                div.style.justifyContent = "center";
                div.style.alignItems = "center";
                div.innerText = entity[_dataOptions.entityNameProp]
                containerElement.appendChild(div);
            });
        }

        function setData(data: ChartData) {
            _data = data;
        }

        function setDataOptions(dataOptions: ChartDataOptions) {
            if (dataOptions == null)
                return;

            Object.entries(dataOptions)
                .filter(([key, value]) => value !== undefined)
                .forEach(([key, value]) => {
                    (_dataOptions as any)[key] = value;
                });
        }

        function isTimeInRange(startTime: Date, endTime?: Date): boolean {
            if (endTime == null) {
                return _state.chartRenderStartTime <= startTime && startTime <= _state.chartRenderEndTime;
            }
            else {
                return _state.chartStartTime <= endTime && endTime <= _state.chartEndTime;
            }
        }

        function trucateTimeRange(startTime: Date, endTime?: Date): [Date, Date?] {
            const trucateStartTime = new Date(Math.max(startTime.getTime(), _state.chartRenderStartTime.getTime()));
            const trucateEndTime = endTime == null ? null : new Date(Math.min(endTime.getTime(), _state.chartRenderEndTime.getTime()));
            return [trucateStartTime, trucateEndTime];
        }

        /**
         * 차트를 그린다.
         */
        function render() {
            _initLayout();
            _renderMainTitle();
            _renderSubTitle();
            _renderColumnTitle();
            _renderColumnHeader();

            _renderCanvas();
            _startRenderEntityList();
        }

        /**
         * 캔버스 영역을 렌더링한다.
         */
        function _renderCanvas() {
            // 일부 렌더링에는 마지막 줌 시간이 필요하므로 미리 저장해둔다.
            _state.lastZoomTime = new Date();
            _resetCanvasSize();

            _renderSideCanvas();
            _renderSidePointEvents();

            _renderMainCanvas();
            _renderGlobalRangeEvents();
        }

        function _initLayout() {
            cssService.setChartWidth(_state.chartWidth);
            cssService.setChartHeight(_state.chartHeight);
            cssService.setLeftPanelWidth(_state.leftPanelWidth);
            cssService.setColumnTitleHeight(_state.columnTitleHeight);
            cssService.setColumnHeaderHeight(_state.columnHeaderHeight);
            cssService.setSideCanvasHeight(_state.sideCanvasHeight);

            cssService.setCellWidth(_state.cellWidth);
            cssService.setCellHeight(_state.cellHeight);
            cssService.setSideCanvasContentHeight(_state.sideCanvasContentHeight);
            cssService.setCellContentHeight(_state.cellContentHeight);

            cssService.setScrollWidth(_state.scrollWidth);
        }

        function _renderMainTitle() {
            _mainTitleElement.replaceChildren();
            if (_state.mainTitleRender != null) {
                _state.mainTitleRender(_mainTitleElement);
            } else {
                _mainTitleElement.innerText = _state.mainTitle;
            }
        }

        function _renderSubTitle() {
            _subTitleElement.replaceChildren();
            if (_state.subTitleRender != null) {
                _state.subTitleRender(_subTitleElement);
            } else {
                _subTitleElement.innerText = _state.subTitle;
            }
        }

        function _renderColumnTitle() {
            _columnTitleElement.replaceChildren();
            if (_state.columnTitleRender != null) {
                _state.columnTitleRender(_columnTitleElement);
            } else {
                _columnTitleElement.innerText = _state.columnTitle;
            }
        }

        function _renderColumnHeader() {
            _columnHeaderElement.replaceChildren();

            let startTime = _state.chartRenderStartTime;
            let endTime = _state.chartRenderEndTime;
            let headerCellCount = (endTime.valueOf() - startTime.valueOf()) / dateTimeService.toTime(_state.cellMinutes);
            _state.headerCellCount = headerCellCount;

            let cellIndex = 0;
            let currentTime = startTime;
            while (cellIndex < headerCellCount) {
                const containerElement = document.createElement("div");
                containerElement.classList.add(CLS_COLUMN_HEADER_ITEM);
                _state.headerCellRender(currentTime, containerElement);
                _columnHeaderElement.appendChild(containerElement);
                currentTime = new Date(currentTime.getTime() + dateTimeService.toTime(_state.cellMinutes));
                cellIndex++;
            }
        }

        /**
         * 휠이벤트 발생시 캔버스 줌을 수행한다.
         * @param canvasElement 
         * @param e 
         * @returns 
         */
        function zoomCanvasWhenWheel(canvasElement: HTMLElement, e: WheelEvent) {
            if (e.ctrlKey) {
                let pivotPoint = { x: 0, y: 0 }; // 줌 기준위치. 마우스 커서가 위치한 셀의 좌표.
                // 대상 엘리먼트에 따라 pivotPoint를 다르게 계산한다.
                if (e.target == canvasElement) {
                    pivotPoint.x = e.offsetX;
                    pivotPoint.y = e.offsetY;
                }
                else if ((e.target as HTMLElement).parentElement == canvasElement) {
                    pivotPoint.x = (e.target as HTMLElement).offsetLeft + e.offsetX;
                    pivotPoint.y = (e.target as HTMLElement).offsetTop + e.offsetY;
                }
                else if ((e.target as HTMLElement).parentElement.parentElement == canvasElement) {
                    pivotPoint.x = (e.target as HTMLElement).parentElement.offsetLeft + e.offsetX;
                    pivotPoint.y = (e.target as HTMLElement).parentElement.offsetTop + e.offsetY;
                }
                else {
                    return;
                }
                if (e.deltaY > 0) {
                    _zoomOutCanvas(pivotPoint.x, pivotPoint.y);
                }
                else {
                    _zoomInCanvas(pivotPoint.x, pivotPoint.y);
                }
            }
        }
        /**
         * 캔버스 크기를 재조정한다.
         */
        function _resetCanvasSize() {
            /**
             * main canvas에만 스크롤을 표시한다.
             * timeline header와 timeline canvas는 main canvas 수평스크롤과 동기화한다.
             * entity list는 main canvas 수직스크롤과 동기화한다.
             */
            const canvasWidth = _state.cellWidth * _state.headerCellCount;
            const canvasHeight = _state.cellHeight * _data.entities.length;

            _columnHeaderElement.style.width = `${canvasWidth + _state.scrollWidth}px`;
            _sideCanvasElement.style.width = `${canvasWidth + _state.scrollWidth}px`;
            _mainCanvasElement.style.width = `${canvasWidth}px`;
            _mainCanvasElement.style.height = `${canvasHeight}px`;
        }

        /**
         * 보조 캔버스를 그린다.
         */
        function _renderSideCanvas() {
            _sideCanvasElement.replaceChildren();
            if (_state.hasVerticalLine)
                _renderSideCanvasVerticalLine();
        }
        function _renderSideCanvasVerticalLine() {
            const canvasWidth = _sideCanvasElement.scrollWidth;
            const lineGap = _state.cellWidth;
            const lineHeight = _state.sideCanvasHeight;
            const vLineCount = Math.ceil(canvasWidth / lineGap);

            let left = 0;
            for (let i = 1; i <= vLineCount; i++) {
                left += lineGap;
                const line = document.createElement("div") as HTMLElement;
                line.classList.add(CLS_SIDE_CANVASE_V_BORDER);
                line.style.height = `${lineHeight}px`;
                line.style.left = `${left}px`;
                _sideCanvasElement.appendChild(line);
            }
        }

        function _renderSidePointEvents() {
            if (_data.sidePointEvents != null && _data.sidePointEvents.length > 0) {
                for (const event of _data.sidePointEvents) {
                    _renderSidePointEvent(event);
                }
            }
        }
        function _renderSidePointEvent(event: PointEvent) {
            const evtStartTime = event[_dataOptions.sidePointEventTimeProp] as Date;
            if (!isTimeInRange(evtStartTime))
                return;
            const [renderStartTime] = trucateTimeRange(evtStartTime);

            const containerElement = document.createElement("div");
            const time = dateTimeService.toMinutes(renderStartTime.valueOf() - _state.chartRenderStartTime.valueOf());
            const center = time * _state.cellWidth / _state.cellMinutes;
            const top = (_state.sideCanvasHeight - _state.sideCanvasContentHeight) / 2;
            const width = _state.sideCanvasContentHeight;
            containerElement.style.left = `${center - (width / 2)}px`;
            containerElement.style.top = `${top}px`;
            containerElement.classList.add(CLS_SIDE_CANVAS_POINT_EVENT);

            if (_state.sidePointEventRender != null)
                _state.sidePointEventRender(event, _sideCanvasElement, containerElement);
            _sideCanvasElement.appendChild(containerElement);
        }

        function _renderMainCanvas() {
            _mainCanvasElement.replaceChildren();
            if (_state.hasVerticalLine)
                _renderMainCanvasVLine();
        }
        function _renderMainCanvasVLine() {
            const canvasWidth = _mainCanvasElement.scrollWidth;
            const lineGap = _state.cellWidth;
            const lineHeight = _mainCanvasElement.scrollHeight;
            const vLineCount = Math.ceil(canvasWidth / lineGap);

            let left = 0;
            for (let i = 1; i <= vLineCount - 1; i++) {
                left += lineGap;
                const line = document.createElement("div") as HTMLElement;
                line.classList.add(CLS_MAIN_CANVAS_V_BORDER);
                line.style.left = `${left}px`;
                line.style.height = `${lineHeight}px`;

                _mainCanvasElement.appendChild(line);
            }
        }

        /**
         * 현재 리스트에 보여지는 엔티티의 인덱스
         */
        let _intersectingEntityContainers = new Map<number, EntityContainer>();

        function _renderEntity(entityContainer: EntityContainer) {
            const { index, entity, containerEl, lastRenderTime } = entityContainer;
            const shouldRender = lastRenderTime == null || lastRenderTime <= _state.lastZoomTime;
            if (!shouldRender)
                return;

            containerEl.replaceChildren();
            _state.entityRender(entity, containerEl);
            _renderEntityEvents(entity, index);

            if (_state.hasHorizontalLine) {
                const mainCanvasItem = document.createElement("div");
                mainCanvasItem.classList.add(CLS_MAIN_CANVAS_H_BORDER);
                mainCanvasItem.style.top = `${_state.cellHeight * (index)}px`;
                _mainCanvasElement.appendChild(mainCanvasItem);
            }
            entityContainer.lastRenderTime = new Date();
        }

        const callback: IntersectionObserverCallback = (changedEntries: IntersectionObserverEntry[]) => {
            changedEntries.forEach((entry: IntersectionObserverEntry, i: number) => {
                const containerEl = entry.target as HTMLElement;
                const entityContainer = _entityContainers.get(containerEl);

                if (entry.isIntersecting)
                    _intersectingEntityContainers.set(entityContainer.index, entityContainer);
                else
                    _intersectingEntityContainers.delete(entityContainer.index);

                if (entry.isIntersecting) {
                    _renderEntity(entityContainer);
                }

            });
        }
        const options: IntersectionObserverInit = {
            root: _entityListBoxElement,
            threshold: 0,
        };

        const _intersecionObserver = new IntersectionObserver(callback, options);

        /**
         * 엔티티 리스트 그리기 과정을 실행한다.
         * 실제 엔티티는 보여지는 영역에 따라 동적으로 그려진다.
         */
        function _startRenderEntityList() {
            _entityListBoxElement.replaceChildren();

            const canvasHeight = _mainCanvasElement.scrollHeight;
            const cellHeight = _state.cellHeight;
            const containerCount = Math.floor(canvasHeight / cellHeight);
            for (let i = 0; i < containerCount; i++) {
                const containerEl = document.createElement("div");
                containerEl.classList.add(CLS_ENTITY_LIST_ITEM);
                _entityListBoxElement.appendChild(containerEl);

                _entityContainers.set(containerEl, {
                    index: i,
                    containerEl: containerEl,
                    entity: _data.entities[i],
                    lastRenderTime: null,
                    hLine: null
                });

                _intersecionObserver.observe(containerEl);
            }
        }

        function _stopRenderEntityList() {
            _intersecionObserver.disconnect();
        }

        function _renderEntityEvents(entity: Entity, rowIndex: number) {
            const pointEvents = entity[_dataOptions.entityPointEventsProp];
            if (pointEvents != null && pointEvents.length > 0) {
                for (const event of pointEvents) {
                    _renderEntityPointEvent(event, rowIndex);
                }
            }
            const rangeEvents = entity[_dataOptions.entityRangeEventsProp];
            if (rangeEvents != null && rangeEvents.length > 0) {
                for (const event of rangeEvents) {
                    _renderEntityRangeEvent(event, rowIndex);
                }
            }
        }

        function _renderEntityPointEvent(event: PointEvent, rowIndex: number) {
            const evtStartTime = event[_dataOptions.entityPointEventTimeProp] as Date;
            if (!isTimeInRange(evtStartTime))
                return;
            const [renderStartTime] = trucateTimeRange(evtStartTime);

            const containerElement = document.createElement("div");
            const time = dateTimeService.toMinutes(renderStartTime.valueOf() - _state.chartRenderStartTime.valueOf());
            const center = time * _state.cellWidth / _state.cellMinutes;
            const top = (_state.cellHeight * rowIndex) + ((_state.cellHeight - _state.cellContentHeight) / 2) - 1;
            const width = _state.cellContentHeight;
            containerElement.style.left = `${center - (width / 2)}px`;
            containerElement.style.top = `${top}px`;
            containerElement.classList.add(CLS_MAIN_CANVAS_ENTITY_POINT_EVENT);

            if (_state.entityPointEventRender != null)
                _state.entityPointEventRender(event, _mainCanvasElement, containerElement);

            _mainCanvasElement.appendChild(containerElement);
        }

        function _renderEntityRangeEvent(event: RangeEvent, rowIndex: number) {
            const eventStartTime = event[_dataOptions.entityRangeEventStartTimeProp] as Date;
            const eventEndTime = event[_dataOptions.entityRangeEventEndTimeProp] as Date;
            if (!isTimeInRange(eventStartTime, eventEndTime))
                return;
            const [renderStartTime, renderEndTime] = trucateTimeRange(eventStartTime, eventEndTime);

            const containerElement = document.createElement("div");
            const startTime = dateTimeService.toMinutes(renderStartTime.valueOf() - _state.chartRenderStartTime.valueOf());
            const duration = dateTimeService.toMinutes(renderEndTime.valueOf() - renderStartTime.valueOf());
            const left = startTime * _state.cellWidth / _state.cellMinutes;
            const width = duration * _state.cellWidth / _state.cellMinutes;
            const top = (_state.cellHeight * rowIndex)
                + (_state.cellHeight - _state.cellContentHeight) / 2
                - 1;

            containerElement.style.left = `${left}px`;
            containerElement.style.top = `${top}px`;
            containerElement.style.width = `${width}px`;
            containerElement.classList.add(CLS_MAIN_CANVAS_ENTITY_RANGE_EVENT);

            if (_state.entityRangeEventRender != null)
                _state.entityRangeEventRender(event, _mainCanvasElement, containerElement);

            _mainCanvasElement.appendChild(containerElement);
        }

        function _renderGlobalRangeEvents() {
            if (_data.globalRangeEvents != null && _data.globalRangeEvents.length > 0) {
                for (const event of _data.globalRangeEvents) {
                    _renderGlobalRangeEvent(event);
                }
            }
        }

        function _renderGlobalRangeEvent(event: RangeEvent) {
            const eventStartTime = event[_dataOptions.globalRangeEventStartTimeProp] as Date;
            const eventEndTime = event[_dataOptions.globalRangeEventEndTimeProp] as Date;
            if (!isTimeInRange(eventStartTime, eventEndTime))
                return;
            const [renderStartTime, renderEndTime] = trucateTimeRange(eventStartTime, eventEndTime);

            const containerElement = document.createElement("div");
            const startTime = dateTimeService.toMinutes(renderStartTime.valueOf() - _state.chartRenderStartTime.valueOf());
            const duration = dateTimeService.toMinutes(renderEndTime.valueOf() - renderStartTime.valueOf());
            const left = startTime * _state.cellWidth / _state.cellMinutes;
            const width = duration * _state.cellWidth / _state.cellMinutes;

            containerElement.style.left = `${left}px`;
            containerElement.style.width = `${width}px`;
            containerElement.classList.add(CLS_MAIN_CANVAS_GLOBAL_RANGE_EVENT);

            if (_state.globalRangeEventRender != null)
                _state.globalRangeEventRender(event, _mainCanvasElement, containerElement);

            _mainCanvasElement.appendChild(containerElement);
        }

        function _zoomInCanvas(pivotPointX?: number, pivotPointY?: number) {
            const shouldReset = _state.prevZoomDirection == "out" ||
                _state.accelResetTimeout < new Date().valueOf() - _state.lastZoomTime.valueOf();
            if (shouldReset) {
                _state.zoomVelocityX = 0;
                _state.zoomVelocityY = 0;
            }

            _state.zoomVelocityX += _state.zoomStepY;
            _state.zoomVelocityY += _state.zoomStepX;

            let cellWidth = _state.cellWidth + _state.zoomVelocityX;
            if (_state.maxCellWidth < cellWidth) {
                cellWidth = _state.maxCellWidth;
            }
            let cellHeight = _state.cellHeight + _state.zoomVelocityY;
            if (_state.maxCellHeight < cellHeight) {
                cellHeight = _state.maxCellHeight;
            }

            _zoomCanvas(
                cellWidth,
                cellHeight,
                pivotPointX,
                pivotPointY);

            _state.prevZoomDirection = "in";
        }

        function _zoomOutCanvas(pivotPointX?: number, pivotPointY?: number) {
            const shouldReset = _state.prevZoomDirection == "in" ||
                _state.accelResetTimeout < new Date().valueOf() - _state.lastZoomTime.valueOf();
            if (shouldReset) {
                _state.zoomVelocityX = 0;
                _state.zoomVelocityY = 0;
            }
            _state.zoomVelocityX -= _state.zoomStepY;
            _state.zoomVelocityY -= _state.zoomStepX;
            let cellWidth = _state.cellWidth + _state.zoomVelocityX;
            if (cellWidth < _state.minCellWidth)
                cellWidth = _state.minCellWidth;

            let cellHeight = _state.cellHeight + _state.zoomVelocityY;
            if (cellHeight < _state.minCellHeight)
                cellHeight = _state.minCellHeight;

            _zoomCanvas(
                cellWidth,
                cellHeight,
                pivotPointX,
                pivotPointY);

            _state.prevZoomDirection = "out";
        }

        /**
         * 셀크기 변경을 통해 캔버스 줌을 적용한다.
         * @param cellWidth 셀 너비
         * @param cellHeight 셀 높이
         * @param pivotPointX 스크롤 x기준 위치
         * @param pivotPointY 스크롤 y기준 위치
         */
        function _zoomCanvas(cellWidth: number, cellHeight: number, pivotPointX?: number, pivotPointY?: number) {
            if (cellWidth < _state.minCellWidth || cellHeight < _state.minCellHeight) {
                return;
            }
            if (cellHeight > _state.maxCellHeight || cellWidth > _state.maxCellWidth) {
                return;
            }
            if (cellWidth == _state.cellWidth && cellHeight == _state.cellHeight) {
                return;
            }

            // 줌 후 스크롤 위치 계산
            let scrollLeft = _mainCanvasBoxElement.scrollLeft;
            let scrollTop = _mainCanvasBoxElement.scrollTop;

            if (_state.hZoomEnabled) {
                if (pivotPointX) {
                    const scrollOffset = pivotPointX - scrollLeft;
                    const prevCellWidth = _state.cellWidth;
                    const newPivotPointX = pivotPointX * cellWidth / prevCellWidth; // 기준점까지의 거리
                    scrollLeft = newPivotPointX - scrollOffset;
                }
                _state.cellWidth = cellWidth;
                cssService.setCellWidth(_state.cellWidth);
            }

            if (_state.vZoomEnabled) {
                if (pivotPointY) {
                    const scrollOffset = pivotPointY - scrollTop;
                    const prevCellHeight = _state.cellHeight;
                    const newPivotPointY = pivotPointY * cellHeight / prevCellHeight; // 기준점까지의 거리
                    scrollTop = newPivotPointY - scrollOffset;
                }
                _state.cellHeight = cellHeight;
                _state.cellContentHeight = _state.cellContentHeightRatio * _state.cellHeight;
                cssService.setCellHeight(_state.cellHeight);
                cssService.setCellContentHeight(_state.cellContentHeight);
            }

            // 차트 렌더링을 새로 진행한다.
            // 엔티티리스트는 동적으로 렌더링이 진행되므로 새로 그리지 않는다.
            _renderCanvas();

            // 현재 보여지는 엔티티 리스트만 다시 그린다.
            _renderIntersectingEntitiList();

            // keep scroll position
            _mainCanvasBoxElement.scrollLeft = scrollLeft;
            _mainCanvasBoxElement.scrollTop = scrollTop;
        }

        function _renderIntersectingEntitiList() {
            for (const [index, entityContainer] of _intersectingEntityContainers.entries()) {
                _renderEntity(entityContainer);
            }
        }

        function refresh() {
            _initLayout();
            _renderMainTitle();
            _renderSubTitle();
            _renderColumnTitle();
            _renderColumnHeader();

            _renderCanvas();

            _stopRenderEntityList();
            _startRenderEntityList();
            // _renderIntersectingEntitiList();
            // _mainCanvasBoxElement.scrollTop = 0;
        }

        return {
            create,
            render,
            setOptions,
            setData,
            refresh: refresh
        }
    };
}