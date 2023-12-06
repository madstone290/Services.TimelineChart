const DEBUG = false;
namespace Services.TimelineChart {

    /**
     * 차트 이벤트.
     */
    export interface PointEvent {
        time: Date;
    }

    export interface RangeEvent {
        startTime: Date;
        endTime: Date;
    }

    export interface Entity {
        name: string;
        pointEvents: PointEvent[];
        rangeEvents: RangeEvent[];
    }

    interface PointEventItem {
        /**
         * 이벤트 시간
         */
        time: Date;
        /**
         * 이벤트 컨테이너 엘리먼트
         */
        containerEl: HTMLElement;
    }

    interface RangeEventItem {
        /**
         * 이벤트 시작시간
         */
        startTime: Date;
        /**
         * 이벤트 종료시간
         */
        endTime: Date;
        /**
        * 이벤트 컨테이너 엘리먼트
        */
        containerEl: HTMLElement;
    }

    /**
     * 엔티티 행. 엔티티 하나에 대한 행을 의미한다.
     * 테이블 파트와 캔버스 파트를 포함한다.
     */
    interface EntityRow {
        /**
         * 엔티티 인덱스
         */
        index: number;
        /**
         * 엔티티
         */
        entity: Entity;
        /**
         * 테이블 행의 컨테이너 엘리먼트
         */
        containerEl: HTMLElement;
        /**
         * 캔버스의 수평선
         */
        hLine: HTMLElement;
        /**
         * 최근 렌더링 시간
         */
        lastRenderTime: Date;
        /**
         * 캔버스에 렌더링된 포인트 이벤트 목록
         */
        pointEventContainers: PointEventItem[];
        /**
         * 캔버스에 렌더링된 레인지 이벤트 목록
         */
        rangeEventContainers: RangeEventItem[];
    }

    type controllerLocation = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

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

    export interface ChartOptions {
        chartStartTime: Date;
        chartEndTime: Date;
        paddingCellCount?: number;
        mainTitle?: string;
        columnTitle?: string;
        leftPanelWidth?: number;
        columnTitleHeight?: number;
        columnHeaderHeight?: number;
        sideCanvasHeight?: number;
        sideCanvasContentHeightRatio?: number;
        cellMinutes?: number;
        cellWidth?: number;
        cellHeight?: number;
        mainRangeContentRatio?: number;
        mainPointContentRatio?: number;
        minZoomScale?: number;
        maxZoomScale?: number;
        hasHorizontalLine?: boolean;
        hasVerticalLine?: boolean;
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
        tableRowRender?: (entity: Entity, containerEl: HTMLElement) => void;
        sidePointEventRender: (event: PointEvent, canvasEl: HTMLElement, containerEl: HTMLElement) => void;
        entityPointEventRender: (event: PointEvent, canvasEl: HTMLElement, containerEl: HTMLElement) => void;
        entityRangeEventRender: (event: RangeEvent, canvasEl: HTMLElement, containerEl: HTMLElement) => void;
        globalRangeEventRender: (event: RangeEvent, canvasEl: HTMLElement, containerEl: HTMLElement) => void;
        mainTitleRender?: (containerEl: HTMLElement) => void;
        columnTitleRender?: (containerEl: HTMLElement) => void;
        tableColumnRender?: (containerEl: HTMLElement) => void;

        /**
         * 테이블 행에 마우스를 올렸을 때 배경색
         */
        rowHoverColor?: string;

        /**
        * 버튼 클릭시 작동할 세로스크롤 길이
        */
        buttonScrollStepY?: number;

        /**
        * 버튼 클릭시 작동할 가로스크롤 길이
        */
        buttonScrollStepX?: number;

        /**
         * 컨트롤러 고정 여부
         */
        fixedController?: boolean;

        /**
         * 컨트롤러 위치. 고정 컨트롤러인 경우에만 사용한다.
         */
        controllerLocation?: controllerLocation;
    }

    interface ChartState {
        chartStartTime: Date;
        chartEndTime: Date;
        paddingCellCount: number;
        mainTitle: string;
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
        currentZoomScale: number;
        chartHeight: number;
        chartWidth: number;
        cellContentHeightRatio: number;
        cellContentHeight: number;
        headerCellCount: number;
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
        mainTitleRender: (containerEl: HTMLElement) => void;
        columnTitleRender: (containerEl: HTMLElement) => void;
        tableColumnRender: (containerEl: HTMLElement) => void;
        tableRowRender: (entity: Entity, containerEl: HTMLElement) => void;
        sidePointEventRender: (event: PointEvent, canvasEl: HTMLElement, containerEl: HTMLElement) => void;
        entityPointEventRender: (event: PointEvent, canvasEl: HTMLElement, containerEl: HTMLElement) => void;
        entityRangeEventRender: (event: RangeEvent, canvasEl: HTMLElement, containerEl: HTMLElement) => void;
        globalRangeEventRender: (event: RangeEvent, canvasEl: HTMLElement, containerEl: HTMLElement) => void;

        /**
        * 차트 렌더링 시작 시간
        */
        chartRenderStartTime: Date;

        /**
         * 차트 렌더링 종료 시간
         */
        chartRenderEndTime: Date;

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

        /**
         * 버튼 클릭시 작동할 세로스크롤 길이
         */
        buttonScrollStepY: number;

        /**
         * 버튼 클릭시 작동할 가로스크롤 길이
         */
        buttonScrollStepX: number;

        /**
         * 테이블 행에 마우스를 올렸을 때 배경색
         */
        rowHoverColor?: string;

        /**
         * 엔티티클릭으로 이벤트 검색결과를 표시할 때 사용하는 오프셋. 오프셋만큼 스크롤위치를 보정한다.
         */
        entityEventSearchScrollOffset: number;
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
        const CLS_TABLE_COLUMN_BOX = "tc-table-column-box";
        const CLS_ENTITY_TABLE_BOX = "tc-entity-table-box";
        const CLS_ENTITY_TABLE_ITEM = "tc-entity-table-item";

        const CLS_MAIN_BOX = "tc-main-box";
        const CLS_MAIN_CANVAS_BOX = "tc-main-canvas-box";
        const CLS_MAIN_CANVAS = "tc-main-canvas";

        const CLS_SIDE_CANVASE_V_BORDER = "tc-side-canvas-v-border";
        const CLS_SIDE_CANVAS_POINT_EVENT = "tc-side-canvas-point-event";

        const CLS_MAIN_CANVAS_H_BORDER = "tc-main-canvas-h-border";
        const CLS_MAIN_CANVAS_V_BORDER = "tc-main-canvas-v-border";
        const CLS_MAIN_CANVAS_ENTITY_POINT_EVENT = "tc-main-canvas-entity-point-event";
        const CLS_MAIN_CANVAS_ENTITY_RANGE_EVENT = "tc-main-canvas-entity-range-event";
        const CLS_MAIN_CANVAS_GLOBAL_RANGE_EVENT = "tc-main-canvas-global-range-event";

        const CLS_CONTEXT_MENU = "tc-context-menu";
        const CLS_CONTEXT_MENU_FIXED = "tc-context-menu-fixed";
        const CLS_CONTEXT_MENU_TOP_LEFT = "tc-context-menu-top-left"
        const CLS_CONTEXT_MENU_TOP_RIGHT = "tc-context-menu-top-right"
        const CLS_CONTEXT_MENU_BOTTOM_LEFT = "tc-context-menu-bottom-left";
        const CLS_CONTEXT_MENU_BOTTOM_RIGHT = "tc-context-menu-bottom-right";
        const CLS_CONTEXT_MENU_CLOSED = "tc-context-menu-closed";
        const CLS_CONTEXT_MENU_GROUP1 = "tc-context-menu-group1";
        const CLS_CONTEXT_MENU_GROUP2 = "tc-context-menu-group2";
        const CLS_CONTEXT_MENU_ITEM = "tc-context-menu-item";
        const CLS_CONTEXT_MENU_ITEM_UP = "tc-context-menu-item-up";
        const CLS_CONTEXT_MENU_ITEM_DOWN = "tc-context-menu-item-down";
        const CLS_CONTEXT_MENU_ITEM_LEFT = "tc-context-menu-item-left";
        const CLS_CONTEXT_MENU_ITEM_RIGHT = "tc-context-menu-item-right";
        const CLS_CONTEXT_MENU_ITEM_ZOOM_IN = "tc-context-menu-item-zoom-in";
        const CLS_CONTEXT_MENU_ITEM_ZOOM_OUT = "tc-context-menu-item-zoom-out";
        const CLS_CONTEXT_MENU_ITEM_CLOSE = "tc-context-menu-item-close";

        const VAR_CELL_HEIGHT = "--tc-cell-height";
        const VAR_MAIN_POINT_CONTENT_HEIGHT = "--tc-main-point-content-height";
        const VAR_MAIN_RANGE_CONTENT_HEIGHT = "--tc-main-range-content-height";
        const VAR_SCROLL_WIDTH = "--tc-scroll-width";

        const VAR_CHART_HEIGHT = "--tc-height";
        const VAR_CHART_WIDTH = "--tc-width";
        const VAR_LEFT_PANEL_WIDTH = "--tc-list-width";
        const VAR_COLUMN_TITLE_HEIGHT = "--tc-column-title-height";
        const VAR_COLUMN_HEADER_HEIGHT = "--tc-column-header-height";
        const VAR_SIDE_CANVAS_HEIGHT = "--tc-side-canvas-height";
        const VAR_SIDE_CANVAS_CONTENT_HEIGHT = "--tc-side-canvas-content-height";

        // #endregion
        /**
        * 타임라인차트 엘리먼트
        */
        const TC_ELEMENT_HTML = `
                <div class="${CLS_ROOT}">
                    <div class="${CLS_LEFT_PANEL}">
                        <div class="${CLS_MAIN_TITLE}"></div>
                        <div class="${CLS_TABLE_COLUMN_BOX}"></div>
                        <div class="${CLS_ENTITY_TABLE_BOX}"></div>
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
                        <div class="${CLS_MAIN_BOX}">
                            <div class="${CLS_MAIN_CANVAS_BOX}">
                                <div class="${CLS_MAIN_CANVAS}">
                                </div>
                            </div>
                            <div class="${CLS_CONTEXT_MENU}">
                                <div class="${CLS_CONTEXT_MENU_GROUP1}">
                                    <div class="${CLS_CONTEXT_MENU_ITEM} ${CLS_CONTEXT_MENU_ITEM_UP}"></div>
                                    <div class="${CLS_CONTEXT_MENU_ITEM} ${CLS_CONTEXT_MENU_ITEM_DOWN}"></div>
                                    <div class="${CLS_CONTEXT_MENU_ITEM} ${CLS_CONTEXT_MENU_ITEM_LEFT}"></div>
                                    <div class="${CLS_CONTEXT_MENU_ITEM} ${CLS_CONTEXT_MENU_ITEM_RIGHT}"></div>
                                </div>
                                <div class="${CLS_CONTEXT_MENU_GROUP2}">
                                    <div class="${CLS_CONTEXT_MENU_ITEM} ${CLS_CONTEXT_MENU_ITEM_ZOOM_IN}"></div>
                                    <div class="${CLS_CONTEXT_MENU_ITEM} ${CLS_CONTEXT_MENU_ITEM_ZOOM_OUT}"></div>
                                    <div class="${CLS_CONTEXT_MENU_ITEM} ${CLS_CONTEXT_MENU_ITEM_CLOSE}"></div>
                                </div>
                            </div>
                        <div>
                    </div>
                </div>
                `;

        let _data: ChartData;

        let _state: ChartState = {
            chartStartTime: new Date(),
            chartEndTime: new Date(),
            paddingCellCount: 2,
            mainTitle: "",
            leftPanelWidth: 200,
            scrollWidth: 15,
            columnTitleHeight: 40,
            columnHeaderHeight: 40,
            sideCanvasHeight: 40,
            sideCanvasContentHeightRatio: 0.8,
            cellMinutes: 30,
            cellWidth: 40,
            cellHeight: 40,
            chartHeight: 0,
            chartWidth: 0,
            cellContentHeightRatio: 0.8,
            currentZoomScale: 1,
            headerTimeFormat: null,
            headerCellRender: null,
            tableRowRender: null,
            sidePointEventRender: null,
            entityPointEventRender: null,
            entityRangeEventRender: null,
            globalRangeEventRender: null,
            hasHorizontalLine: true,
            hasVerticalLine: true,
            chartRenderStartTime: new Date(),
            chartRenderEndTime: new Date(),
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
            columnTitleRender: null,
            strictTimeRange: false,
            buttonScrollStepX: 400,
            buttonScrollStepY: 200,
            tableColumnRender: null,
            entityEventSearchScrollOffset: -100
        }

        /* Html Elements */
        let _rootElement: HTMLElement;
        let _mainTitleElement: HTMLElement;
        let _tableColumnBoxElement: HTMLElement;
        let _columnTitleElement: HTMLElement;
        let _entityTableBoxElement: HTMLElement;
        let _columnHeaderBoxElement: HTMLElement;
        let _columnHeaderElement: HTMLElement;
        let _sideCanvasBoxElement: HTMLElement;
        let _sideCanvasElement: HTMLElement;
        let _mainCanvasBoxElement: HTMLElement;
        let _mainCanvasElement: HTMLElement;
        let _contextMenuEl: HTMLElement;
        let _upMenuItemEl: HTMLElement;
        let _downMenuItemEl: HTMLElement;
        let _leftMenuItemEl: HTMLElement;
        let _rightMenuItemEl: HTMLElement;
        let _zoomInMenuItemEl: HTMLElement;
        let _zoomOutMenuItemEl: HTMLElement;
        let _closeMenuItemEl: HTMLElement;

        let _sideCanvasVLines: HTMLElement[] = [];
        let _sidePointEventItems = new Array<PointEventItem>();
        /**
         * 현재 리스트에 보여지는 엔티티의 인덱스
         */
        let _intersectingEntityRows = new Map<number, EntityRow>();
        /**
         * 메인캔버스 사이즈 변경 관찰자. fab버튼 및 컬럼헤더 크기 조정에 사용한다.
         */
        let _mainCanvasBoxResizeObserver: ResizeObserver;
        /**
         * 엔티티 컨테이너 목록. 엔티티 렌더링에 사용한다.
         */
        let _entityRows = new Map<HTMLElement, EntityRow>();
        /**
         * 메인캔버스 수직 경계선 엘리먼트 목록
         */
        let _mainCanvasVLines: HTMLElement[] = [];
        /**
         * 글로벌 레인지 이벤트 엘리먼트 목록
         */
        let _globalRangeEventItems = new Array<RangeEventItem>();
        /**
         * 원본 셀 너비.
         */
        let _originalCellWidth = 0;
        /**
         * 원본 셀 높이.
         */
        let _originalCellHeight = 0;
        /**
         * 현재 Y축 줌값.
         */
        let _currZoomScale = 1;
        /**
         * 이전 X축 줌값.
         */
        let _prevZoomScale = 1;
        /**
         * 최대 X축 줌값.
         */
        let _minZoomScale = 1;
        /**
         * 최소 Y축 줌값.
         */
        let _maxZoomScale = 5;
        /**
         * 기본 줌 스텝.
         */
        let _defaultZoomStep = 0.1;
        /**
         * 현재 줌 속도
         */
        let _zoomVelocity = 0;
        /**
         * 컨트롤러 고정 여부
         */
        let _fixedController: boolean = true;
        /**
         * 버튼 클릭시 작동할 가로스크롤 길이
         */
        let _buttonScrollStepX: number = 400;
        /**
         * 버튼 클릭시 작동할 세로스크롤 길이
         */
        let _buttonScrollStepY: number = 200;
        /**
         * 컨트롤러 위치. 고정 컨트롤러인 경우에만 사용한다.
         */
        let _controllerLocation: controllerLocation = "bottomRight";
        /**
         * 컨트롤러 위치 클래스 맵
         */
        let _controllerLocationClassMap = new Map<controllerLocation, string>([
            ["topLeft", CLS_CONTEXT_MENU_TOP_LEFT],
            ["topRight", CLS_CONTEXT_MENU_TOP_RIGHT],
            ["bottomLeft", CLS_CONTEXT_MENU_BOTTOM_LEFT],
            ["bottomRight", CLS_CONTEXT_MENU_BOTTOM_RIGHT]
        ]);
        /**
         * 메인 캔버스 레인지 이벤트의 컨텐츠 영역의 높이 비율
         */
        let _mainRangeContentRatio: number = 0.8;
        /**
         * 메인 캔버스 포인트 이벤트의 컨텐츠 영역의 높이 비율
         */
        let _mainPointContentRatio: number = 0.6;

        const css = function () {
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

            function setCellHeight(height: number) { setVariable(VAR_CELL_HEIGHT, `${height}px`); }
            function setScrollWidth(width: number) { setVariable(VAR_SCROLL_WIDTH, `${width}px`); }

            function setMainRangeContentHeight(height: number) { setVariable(VAR_MAIN_RANGE_CONTENT_HEIGHT, `${height}px`); }
            function setMainPointContentHeight(height: number) { setVariable(VAR_MAIN_POINT_CONTENT_HEIGHT, `${height}px`); }

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

                setCellHeight,

                setScrollWidth,
                setMainRangeContentHeight,
                setMainPointContentHeight
            }
        }();

        /**
         * 차트 엘리먼트를 생성한다.
         * @param container 
         */
        function create(container: HTMLElement) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(TC_ELEMENT_HTML, 'text/html');
            const element = doc.body.firstChild;
            container.appendChild(element);

            _rootElement = container.getElementsByClassName(CLS_ROOT)[0] as HTMLElement;
            _mainTitleElement = container.getElementsByClassName(CLS_MAIN_TITLE)[0] as HTMLElement;
            _tableColumnBoxElement = container.getElementsByClassName(CLS_TABLE_COLUMN_BOX)[0] as HTMLElement;
            _columnTitleElement = container.getElementsByClassName(CLS_COLUMN_TITLE)[0] as HTMLElement;
            _entityTableBoxElement = container.getElementsByClassName(CLS_ENTITY_TABLE_BOX)[0] as HTMLElement;
            _columnHeaderBoxElement = container.getElementsByClassName(CLS_COLUMN_HEADER_BOX)[0] as HTMLElement;
            _columnHeaderElement = container.getElementsByClassName(CLS_COLUMN_HEADER)[0] as HTMLElement;
            _sideCanvasBoxElement = container.getElementsByClassName(CLS_SIDE_CANVAS_BOX)[0] as HTMLElement;
            _sideCanvasElement = container.getElementsByClassName(CLS_SIDE_CANVAS)[0] as HTMLElement;
            _mainCanvasBoxElement = container.getElementsByClassName(CLS_MAIN_CANVAS_BOX)[0] as HTMLElement;
            _mainCanvasElement = container.getElementsByClassName(CLS_MAIN_CANVAS)[0] as HTMLElement;

            _contextMenuEl = container.getElementsByClassName(CLS_CONTEXT_MENU)[0] as HTMLElement;
            _upMenuItemEl = container.getElementsByClassName(CLS_CONTEXT_MENU_ITEM_UP)[0] as HTMLElement;
            _downMenuItemEl = container.getElementsByClassName(CLS_CONTEXT_MENU_ITEM_DOWN)[0] as HTMLElement;
            _leftMenuItemEl = container.getElementsByClassName(CLS_CONTEXT_MENU_ITEM_LEFT)[0] as HTMLElement;
            _rightMenuItemEl = container.getElementsByClassName(CLS_CONTEXT_MENU_ITEM_RIGHT)[0] as HTMLElement;
            _zoomInMenuItemEl = container.getElementsByClassName(CLS_CONTEXT_MENU_ITEM_ZOOM_IN)[0] as HTMLElement;
            _zoomOutMenuItemEl = container.getElementsByClassName(CLS_CONTEXT_MENU_ITEM_ZOOM_OUT)[0] as HTMLElement;
            _closeMenuItemEl = container.getElementsByClassName(CLS_CONTEXT_MENU_ITEM_CLOSE)[0] as HTMLElement;

            _initCanvasBasicEventListeners();
            _initContextMenuElements();

            // 컨테이너 크기에 맞춰 차트 크기를 조정한다.
            _setChartSize(container.clientWidth, container.clientHeight);
        }

        function _setChartSize(width: number, height: number) {
            _state.chartWidth = width;
            _state.chartHeight = height;
            css.setChartWidth(width);
            css.setChartHeight(height);
        }

        function _setLeftPanelWidth(width: number) {
            _state.leftPanelWidth = width;
            css.setLeftPanelWidth(width);
        }

        function _setColumnTitleHeight(height: number) {
            _state.columnTitleHeight = height;
            css.setColumnTitleHeight(height);
        }

        function _setColumnHeaderHeight(height: number) {
            _state.columnHeaderHeight = height;
            css.setColumnHeaderHeight(height);
        }

        function _setSideCanvasHeight(height: number) {
            _state.sideCanvasHeight = height;
            css.setSideCanvasHeight(height);
        }

        function _setSideCanvasContentHeight(height: number) {
            _state.sideCanvasContentHeight = height;
            css.setSideCanvasContentHeight(height);
        }

        function _setCellWidth(width: number) {
            _state.cellWidth = width;
        }

        function _setCellHeight(height: number) {
            _state.cellHeight = height;
            //todo _cellHeight = height;
            css.setCellHeight(height);
            css.setMainRangeContentHeight(height * _mainRangeContentRatio);
            css.setMainPointContentHeight(height * _mainPointContentRatio);
        }

        function _setScrollWidth(width: number) {
            _state.scrollWidth = width;
            css.setScrollWidth(width);
        }

        /**
         * 밀리초를 분으로 변환한다.
         * @param time 
         * @returns 
         */
        function toMinutes(time: number) {
            return time / (60 * 1000);
        }
        /**
         * 분을 밀리초로 변환한다.
         * @param minutes 
         * @returns 
         */
        function toTime(minutes: number) {
            return minutes * 60 * 1000;
        }

        function _getPositionInContainer(clientX: number, clientY: number, container: HTMLElement) {
            const rect = container.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            return { x, y };
        }

        function _getPositionInMainCanvas(clientX: number, clientY: number) {
            return _getPositionInContainer(clientX, clientY, _mainCanvasElement);
        }

        function _getPositionInMainCanvasBox(clientX: number, clientY: number) {
            return _getPositionInContainer(clientX, clientY, _mainCanvasBoxElement);
        }

        function _getClientCenterPositionInMainCanvasBox() {
            const rect = _mainCanvasBoxElement.getBoundingClientRect();
            const clientX = rect.left + rect.width / 2;
            const clientY = rect.top + rect.height / 2;
            return { clientX, clientY };
        }

        function _getMainRangeContentHeight() {
            return _state.cellHeight * _mainRangeContentRatio;
        }
        function _getMainPointContentHeight() {
            return _state.cellHeight * _mainPointContentRatio;
        }

        /**
         * 캔버스 기본 이벤트 리스너를 추가한다.(스크롤, 마우스드래그, 마우스휠)
         */
        function _initCanvasBasicEventListeners() {
            _mainCanvasBoxElement.addEventListener("scroll", (e) => {
                // 가로스크롤 동기화
                _columnHeaderBoxElement.scrollLeft = _mainCanvasBoxElement.scrollLeft;
                _sideCanvasBoxElement.scrollLeft = _mainCanvasBoxElement.scrollLeft;
                // 세로스크롤 동기화
                _entityTableBoxElement.scrollTop = _mainCanvasBoxElement.scrollTop;
            });
            _entityTableBoxElement.addEventListener("wheel", (e) => {
                // 세로스크롤 동기화
                _mainCanvasBoxElement.scrollTop += e.deltaY;
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

        function _initContextMenuElements() {
            // fab buttons event. scroll main canvas
            let fabIntervalId: number;
            let fabTimeoutId: number;
            const fabIntervalTimeout = 30;
            const fabTimeoutTimeout = 300;

            const shortStepX = () => _state.buttonScrollStepX;
            const shortStepY = () => _state.buttonScrollStepY;
            const longStepX = () => _state.buttonScrollStepX / 2;
            const longStepY = () => _state.buttonScrollStepY / 2;

            const addDirectionDownHandler = (btn: HTMLElement, shortX: () => number, longX: () => number, shortY: () => number, longY: () => number) => {
                btn.addEventListener("mousedown", function (e) {
                    _mainCanvasBoxElement.scrollTo({
                        top: _mainCanvasBoxElement.scrollTop + shortY(),
                        left: _mainCanvasBoxElement.scrollLeft + shortX(),
                        behavior: "smooth"
                    });
                    fabTimeoutId = setTimeout(() => {
                        fabIntervalId = setInterval(() => {
                            _mainCanvasBoxElement.scrollTop += longY();
                            _mainCanvasBoxElement.scrollLeft += longX();
                        }, fabIntervalTimeout);
                    }, fabTimeoutTimeout);
                });
                btn.addEventListener("mouseup", (e) => {
                    clearInterval(fabIntervalId);
                    clearTimeout(fabTimeoutId);
                });
                btn.addEventListener("mouseleave", (e) => {
                    clearInterval(fabIntervalId);
                    clearTimeout(fabTimeoutId);
                });
            }

            addDirectionDownHandler(_upMenuItemEl, () => 0, () => 0, () => -shortStepY(), () => -longStepY());
            addDirectionDownHandler(_downMenuItemEl, () => 0, () => 0, () => shortStepY(), () => longStepY());
            addDirectionDownHandler(_leftMenuItemEl, () => -shortStepX(), () => -longStepX(), () => 0, () => 0);
            addDirectionDownHandler(_rightMenuItemEl, () => shortStepX(), () => longStepX(), () => 0, () => 0);

            _zoomInMenuItemEl.addEventListener("click", (e) => {
                if (_fixedController) {
                    const { clientX, clientY } = _getClientCenterPositionInMainCanvasBox();
                    const { x, y } = _getPositionInMainCanvas(clientX, clientY);
                    _zoomIn(x, y);
                } else {
                    const { x, y } = _getPositionInMainCanvas(e.clientX, e.clientY);
                    _zoomIn(x, y);
                }
            });
            _zoomOutMenuItemEl.addEventListener("click", (e) => {
                if (_fixedController) {
                    const { clientX, clientY } = _getClientCenterPositionInMainCanvasBox();
                    const { x, y } = _getPositionInMainCanvas(clientX, clientY);
                    _zoomOut(x, y);
                } else {
                    const { x, y } = _getPositionInMainCanvas(e.clientX, e.clientY);
                    _zoomOut(x, y);
                }
            });
            _closeMenuItemEl.addEventListener("click", (e) => {
                if (_fixedController) {
                    _contextMenuEl.classList.toggle(CLS_CONTEXT_MENU_CLOSED);
                } else {
                    _contextMenuEl.style.display = "none";
                }
            });


            // 모바일 기기에서 contextmenu 이벤트가 정상적으로 발생하는 지 확인 필요. 
            // 발생하지 않는 경우 touchstart 이벤트를 사용해야 한다.
            // 고정 컨트롤러가 아닌 경우에만 컨텍스트 메뉴 팝업 적용.
            _mainCanvasElement.addEventListener("contextmenu", (e) => {
                if (!DEBUG) {
                    e.preventDefault();
                }
                if (_fixedController)
                    return;
                const { x, y } = _getPositionInMainCanvasBox(e.clientX, e.clientY);
                _contextMenuEl.style.left = `${x}px`;
                _contextMenuEl.style.top = `${y}px`;
                _contextMenuEl.style.display = "flex";
            });

            let touchTimer: number;
            let longTouchDuration = 300;
            _mainCanvasElement.addEventListener("touchstart", (e) => {
                touchTimer = setTimeout(() => {
                    console.log("long touch", e);
                }, longTouchDuration);
            });
            _mainCanvasElement.addEventListener("touchend", (e) => {
                if (touchTimer)
                    clearTimeout(touchTimer);
            });

            _mainCanvasElement.addEventListener("click", (e) => {
                if (_fixedController)
                    return;
                const targetEl = e.target as HTMLElement;
                if (targetEl == _zoomInMenuItemEl || targetEl == _zoomOutMenuItemEl) {
                    return;
                }
                _contextMenuEl.style.display = "none";
            });
        }

        function setOptions(options: ChartOptions) {
            Object.entries(options)
                .filter(([key, value]) => value !== undefined)
                .forEach(([key, value]) => {
                    (_state as any)[key] = value;
                });

            _originalCellWidth = options.cellWidth ?? _state.cellWidth;
            _originalCellHeight = options.cellHeight ?? _state.cellHeight;
            _fixedController = options.fixedController ?? _fixedController;
            _buttonScrollStepX = options.buttonScrollStepX ?? _buttonScrollStepX;
            _buttonScrollStepY = options.buttonScrollStepY ?? _buttonScrollStepY;
            _controllerLocation = options.controllerLocation ?? _controllerLocation;
            _mainRangeContentRatio = options.mainRangeContentRatio ?? _mainRangeContentRatio;
            _mainPointContentRatio = options.mainPointContentRatio ?? _mainPointContentRatio;

            _setLeftPanelWidth(options.leftPanelWidth ?? _state.leftPanelWidth);
            _setColumnTitleHeight(options.columnTitleHeight ?? _state.columnTitleHeight);
            _setColumnHeaderHeight(options.columnHeaderHeight ?? _state.columnHeaderHeight);
            _setSideCanvasHeight(options.sideCanvasHeight ?? _state.sideCanvasHeight);
            _setSideCanvasContentHeight(_state.cellHeight * (options.sideCanvasContentHeightRatio ?? _state.sideCanvasContentHeightRatio));
            _setCellWidth(options.cellWidth ?? _state.cellWidth);
            _setCellHeight(options.cellHeight ?? _state.cellHeight);

            _setScrollWidth(_state.scrollWidth);
            _state.sideCanvasContentHeight = _state.sideCanvasContentHeightRatio * _state.sideCanvasHeight;


            _state.chartRenderStartTime = new Date(_state.chartStartTime.getTime() - toTime(_state.cellMinutes * _state.paddingCellCount))
            _state.chartRenderEndTime = new Date(_state.chartEndTime.getTime() + toTime(_state.cellMinutes * _state.paddingCellCount))

            function mainCanvasBoxresizeCallback() {
                if (_state.columnAutoWidth) {
                    // 컬럼헤더에 따라 캔버스 사이즈가 변경된다.
                    const canvasWidth = _mainCanvasBoxElement.clientWidth;
                    _originalCellWidth = canvasWidth / _state.headerCellCount;
                    const cellWidth = _originalCellWidth * _currZoomScale;
                    _setCellWidth(cellWidth);
                    _refresh();
                }
            }

            _mainCanvasBoxResizeObserver?.disconnect();
            _mainCanvasBoxResizeObserver = new ResizeObserver(mainCanvasBoxresizeCallback);
            _mainCanvasBoxResizeObserver.observe(_mainCanvasBoxElement);

            _state.headerTimeFormat = options.headerTimeFormat ?? ((time: Date) => { return time.toLocaleString(); });
            _state.headerCellRender = options.headerCellRender ?? ((time: Date, containerElement: HTMLElement) => {
                const div = document.createElement("div");
                div.innerText = _state.headerTimeFormat(time);
                containerElement.appendChild(div);
            });
        }

        function setData(data: ChartData) {
            _data = data;
        }

        function isTimeInRange(startTime: Date, endTime?: Date): boolean {
            if (endTime == null) {
                return _state.chartRenderStartTime <= startTime && startTime <= _state.chartRenderEndTime;
            }
            else {
                return _state.chartStartTime <= endTime && endTime <= _state.chartEndTime;
            }
        }

        /**
         * 주어진 시간범위를 유효한 시간범위로 조정한다.
         * @param startTime 
         * @param endTime 
         * @returns 
         */
        function trucateTimeRange(startTime: Date, endTime?: Date): [Date, Date?] {
            const trucateStartTime = new Date(Math.max(startTime.getTime(), _state.chartRenderStartTime.getTime()));
            const trucateEndTime = endTime == null ? null : new Date(Math.min(endTime.getTime(), _state.chartRenderEndTime.getTime()));
            return [trucateStartTime, trucateEndTime];
        }

        /**
         * 차트를 그린다.
         */
        function render() {
            // 렌더링 전 적용할 설정을 적용한다.
            if (_fixedController) {
                _contextMenuEl.classList.add(CLS_CONTEXT_MENU_FIXED);
                const locationClass = _controllerLocationClassMap.get(_controllerLocation);
                _contextMenuEl.classList.add(locationClass);
            }

            _renderMainTitle();
            _renderTableColumn();
            _renderColumnTitle();
            _renderColumnHeader();

            // 컬럼헤더에 따라 캔버스 사이즈가 변경된다.
            _updateElementSize();
            _renderSideCanvas();
            _renderMainCanvas();
            _startRenderEntityRow();

            // 스크롤 위치를 강제로 변경시켜 렌더링을 유도한다.
            _mainCanvasBoxElement.scrollTo(_mainCanvasBoxElement.scrollLeft, _mainCanvasBoxElement.scrollTop - 1);
        }

        function _renderMainTitle() {
            _mainTitleElement.replaceChildren();
            if (_state.mainTitleRender != null) {
                _state.mainTitleRender(_mainTitleElement);
            } else {
                _mainTitleElement.innerText = _state.mainTitle;
            }
        }

        function _renderTableColumn() {
            _tableColumnBoxElement.replaceChildren();
            if (_state.tableColumnRender != null)
                _state.tableColumnRender(_tableColumnBoxElement);
        }

        function _renderColumnTitle() {
            _columnTitleElement.replaceChildren();
            if (_state.columnTitleRender != null) {
                _state.columnTitleRender(_columnTitleElement);
            } else {
                _columnTitleElement.innerText = _state.columnTitle;
            }
        }

        let _headerElements = new Map<number, HTMLElement>();
        let _headerRightBorderEl: HTMLElement;

        function _renderColumnHeader() {
            _columnHeaderElement.replaceChildren();
            _headerElements.clear();
            _headerRightBorderEl = null;

            let startTime = _state.chartRenderStartTime;
            let endTime = _state.chartRenderEndTime;
            let headerCellCount = (endTime.valueOf() - startTime.valueOf()) / toTime(_state.cellMinutes);
            _state.headerCellCount = headerCellCount;
            if (_state.columnAutoWidth === true) {
                _originalCellWidth = _mainCanvasBoxElement.clientWidth / headerCellCount;
            }

            let cellIndex = 0;
            let currentTime = startTime;
            while (cellIndex < headerCellCount) {
                const containerElement = document.createElement("div");
                containerElement.classList.add(CLS_COLUMN_HEADER_ITEM);
                containerElement.style.left = `${cellIndex * _state.cellWidth}px`;
                containerElement.style.width = `${_state.cellWidth}px`;
                _state.headerCellRender(currentTime, containerElement);
                _columnHeaderElement.appendChild(containerElement);
                _headerElements.set(cellIndex, containerElement);

                currentTime = new Date(currentTime.getTime() + toTime(_state.cellMinutes));
                cellIndex++;
            }
            // 마지막 셀의 오른쪽 테두리를 그린다.
            const rightBorder = document.createElement("div");
            rightBorder.classList.add(CLS_COLUMN_HEADER_ITEM);
            rightBorder.style.width = `1px`;
            rightBorder.style.height = `100%`;
            rightBorder.style.left = `${cellIndex * _state.cellWidth}px`;
            _headerRightBorderEl = rightBorder;
            _columnHeaderElement.appendChild(rightBorder);
        }

        function _refreshColumnHeaders() {
            for (const [index, el] of _headerElements) {
                el.style.left = `${index * _state.cellWidth}px`;
                el.style.width = `${_state.cellWidth}px`;
            }
            _headerRightBorderEl.style.left = `${_state.headerCellCount * _state.cellWidth}px`;
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
                    _zoomOut(pivotPoint.x, pivotPoint.y);
                }
                else {
                    _zoomIn(pivotPoint.x, pivotPoint.y);
                }
            }
        }
        /**
         * UI 엘리먼트의 크기를 변경한다.
         */
        function _updateElementSize() {
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

            _renderSidePointEvents();
        }

        function _renderSideCanvasVerticalLine() {
            const canvasWidth = _sideCanvasElement.scrollWidth;
            const vLineCount = Math.ceil(canvasWidth / _state.cellWidth);

            let left = 0;
            for (let i = 0; i < vLineCount; i++) {
                left += _state.cellWidth;
                const line = document.createElement("div") as HTMLElement;
                line.classList.add(CLS_SIDE_CANVASE_V_BORDER);
                line.style.height = `${_state.sideCanvasHeight}px`;
                line.style.left = `${left}px`;
                _sideCanvasElement.appendChild(line);
                _sideCanvasVLines.push(line);
            }
        }

        function _refreshSideCanvas() {
            _refreshSideCanvasVerticalLine();
            _refreshSidePointEvents();
        }

        function _refreshSideCanvasVerticalLine() {
            let left = 0;
            for (let i = 0; i < _sideCanvasVLines.length; i++) {
                left += _state.cellWidth;
                const line = _sideCanvasVLines[i];
                line.style.left = `${left}px`;
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
            const eventTime = event.time;
            if (!isTimeInRange(eventTime))
                return;
            const containerElement = document.createElement("div");
            const { top, left } = __calcSidePointEventPosition(eventTime);
            containerElement.style.top = `${top}px`;
            containerElement.style.left = `${left}px`;
            containerElement.classList.add(CLS_SIDE_CANVAS_POINT_EVENT);

            if (_state.sidePointEventRender != null)
                _state.sidePointEventRender(event, _sideCanvasElement, containerElement);
            _sideCanvasElement.appendChild(containerElement);
            _sidePointEventItems.push({
                time: eventTime,
                containerEl: containerElement
            });
        }

        function _refreshSidePointEvents() {
            for (const container of _sidePointEventItems) {
                const time = container.time;
                const containerEl = container.containerEl;
                const { top, left } = __calcSidePointEventPosition(time);
                containerEl.style.top = `${top}px`;
                containerEl.style.left = `${left}px`;
            }
        }

        function __calcSidePointEventPosition(eventTime: Date) {
            const [renderStartTime] = trucateTimeRange(eventTime);
            const time = toMinutes(renderStartTime.valueOf() - _state.chartRenderStartTime.valueOf());
            const center = time * _state.cellWidth / _state.cellMinutes;
            const top = (_state.sideCanvasHeight - _state.sideCanvasContentHeight) / 2;
            const width = _state.sideCanvasContentHeight;
            const left = center - (width / 2);
            return {
                left: left,
                top: top
            }
        }

        function _renderMainCanvas() {
            _mainCanvasElement.replaceChildren();
            if (_state.hasVerticalLine)
                _renderMainCanvasVLine();
            _renderGlobalRangeEvents();
        }

        function _refreshMainCanvas() {
            _refreshMainCanvasVLines();
            _refreshGlobalRangeEvents();
            _refreshIntersectingEntitiList();
        }

        function _refreshIntersectingEntitiList() {
            for (const [_, entityRow] of _intersectingEntityRows.entries()) {
                _refreshEntityRow(entityRow);
            }
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
                _mainCanvasVLines.push(line);
            }
        }

        function _refreshMainCanvasVLines() {
            for (let i = 0; i < _mainCanvasVLines.length; i++) {
                const line = _mainCanvasVLines[i];
                line.style.left = `${(i + 1) * _state.cellWidth}px`;
            }
        }

        function _renderEntityRow(entityRow: EntityRow) {
            const { index, entity, containerEl } = entityRow;
            _state.tableRowRender(entity, containerEl);
            _renderEntityEvents(entity, entityRow);

            if (_state.hasHorizontalLine) {
                const mainCanvasHLine = document.createElement("div");
                mainCanvasHLine.classList.add(CLS_MAIN_CANVAS_H_BORDER);
                mainCanvasHLine.style.top = `${_state.cellHeight * (index)}px`;
                _mainCanvasElement.appendChild(mainCanvasHLine);
                entityRow.hLine = mainCanvasHLine;
            }
            entityRow.lastRenderTime = new Date();
        }

        function _refreshEntityRow(entityRow: EntityRow) {
            const { index, entity, containerEl, lastRenderTime } = entityRow;
            entityRow.hLine.style.top = `${_state.cellHeight * (index)}px`;
            _refreshEntityEvents(entityRow);
            entityRow.lastRenderTime = new Date();
        }

        function _refreshEntityEvents(entityRow: EntityRow) {
            _refreshEntityPointEvents(entityRow);
            _refreshEntityRangeEvents(entityRow);
        }

        const callback: IntersectionObserverCallback = (changedEntries: IntersectionObserverEntry[]) => {
            changedEntries.forEach((entry: IntersectionObserverEntry, i: number) => {
                const containerEl = entry.target as HTMLElement;
                const entityRow = _entityRows.get(containerEl);

                if (entry.isIntersecting) {
                    if (entityRow.lastRenderTime == null) {
                        // 최초 렌더링
                        _renderEntityRow(entityRow);
                    } else if (entityRow.lastRenderTime <= _state.lastZoomTime) {
                        // 리페인트
                        _refreshEntityRow(entityRow);
                    }
                    _intersectingEntityRows.set(entityRow.index, entityRow);
                }
                else {
                    _intersectingEntityRows.delete(entityRow.index);
                }
            });
        }

        /**
         * 엔티티 리스트 그리기 과정을 실행한다.
         * 실제 엔티티는 보여지는 영역에 따라 동적으로 그려진다.
         */
        function _startRenderEntityRow() {
            _entityTableBoxElement.replaceChildren();

            const options: IntersectionObserverInit = {
                root: _entityTableBoxElement,
                threshold: 0,
            };
            const intersecionObserver = new IntersectionObserver(callback, options);

            const canvasHeight = _mainCanvasElement.scrollHeight;
            const cellHeight = _state.cellHeight;
            const containerCount = Math.floor(canvasHeight / cellHeight);
            for (let i = 0; i < containerCount; i++) {
                /*
엔티티 컨테이너(로우) 생성
-마우스 오버시 배경색 변경
-마우스 클릭시 해당 엔티티의 가장 빠른 이벤트로 이동
                */

                const containerEl = document.createElement("div");
                containerEl.classList.add(CLS_ENTITY_TABLE_ITEM);
                containerEl.addEventListener("mouseenter", (e) => {
                    (containerEl as any).tag = containerEl.style.backgroundColor;
                    containerEl.style.backgroundColor = _state.rowHoverColor;
                });
                containerEl.addEventListener("mouseleave", (e) => {
                    containerEl.style.backgroundColor = (containerEl as any).tag;
                });
                containerEl.addEventListener("click", (e) => {
                    const entityContainer = _entityRows.get(containerEl);
                    const entity = entityContainer.entity;
                    const evtStartTime = _getFirstVisibleEventTime(entity);

                    if (evtStartTime != null) {
                        const [renderStartTime] = trucateTimeRange(evtStartTime);
                        const time = toMinutes(renderStartTime.valueOf() - _state.chartRenderStartTime.valueOf());
                        const left = time * _state.cellWidth / _state.cellMinutes;
                        _mainCanvasBoxElement.scrollLeft = left + _state.entityEventSearchScrollOffset;
                    }
                });
                _entityTableBoxElement.appendChild(containerEl);

                _entityRows.set(containerEl, {
                    index: i,
                    containerEl: containerEl,
                    entity: _data.entities[i],
                    lastRenderTime: null,
                    hLine: null,
                    pointEventContainers: [],
                    rangeEventContainers: [],
                });
                intersecionObserver.observe(containerEl);
            }
        }

        /**
         * 화면에 보이는 엔티티의 이벤트중 가장 빠른 시간을 찾는다.
         * @param entity 
         * @returns 
         */
        function _getFirstVisibleEventTime(entity: Entity): Date | null {
            const visibleRangeEvents = _getVisibleRangeEvents(entity.rangeEvents);
            let rangeEvtTime = null;
            if (0 < visibleRangeEvents.length) {
                // 현재 화면에 보이는 엔티티의 가장 빠른 이벤트 시간을 찾는다.
                rangeEvtTime = visibleRangeEvents[0].startTime;
            }

            const visiblePointEvents = _getVisiblePointEvents(entity.pointEvents);
            let pointEvtTime = null;
            if (0 < visiblePointEvents.length) {
                pointEvtTime = visiblePointEvents[0].time;
            }

            let evtStartTime = null;
            if (rangeEvtTime != null && pointEvtTime != null) {
                evtStartTime = rangeEvtTime < pointEvtTime ? rangeEvtTime : pointEvtTime;
            }
            else if (rangeEvtTime != null && pointEvtTime == null) {
                evtStartTime = rangeEvtTime;
            }
            else if (rangeEvtTime == null && pointEvtTime != null) {
                evtStartTime = pointEvtTime;
            }
            return evtStartTime;
        }

        /**
         * 화면에 보이는 엔티티의 이벤트 목록을 찾는다. 시간순 정렬.
         * @param rangeEvents 
         * @returns 
         */
        function _getVisibleRangeEvents(rangeEvents: RangeEvent[]) {
            if (rangeEvents == null || rangeEvents.length == 0)
                return [];

            return rangeEvents.filter((evt: RangeEvent) => {
                return _state.chartRenderStartTime.valueOf() <= evt.startTime.valueOf()
                    && evt.startTime.valueOf() <= _state.chartRenderEndTime.valueOf();
            }).sort((a: RangeEvent, b: RangeEvent) => {
                return a.startTime.valueOf() - b.startTime.valueOf();
            });
        }

        /**
         * 화면에 보이는 엔티티의 이벤트 목록을 찾는다. 시간순 정렬.
         * @param pointEvents 
         * @returns 
         */
        function _getVisiblePointEvents(pointEvents: PointEvent[]) {
            if (pointEvents == null || pointEvents.length == 0)
                return [];

            return pointEvents.filter((evt: PointEvent) => {
                return _state.chartRenderStartTime.valueOf() <= evt.time.valueOf()
                    && evt.time.valueOf() <= _state.chartRenderEndTime.valueOf();
            }).sort((a: PointEvent, b: PointEvent) => {
                return a.time.valueOf() - b.time.valueOf();
            });
        }

        function _renderEntityEvents(entity: Entity, entityRow: EntityRow) {
            const pointEvents = entity.pointEvents;
            if (pointEvents != null && pointEvents.length > 0) {
                for (const event of pointEvents) {
                    _renderEntityPointEvent(event, entityRow);
                }
            }
            const rangeEvents = entity.rangeEvents;
            if (rangeEvents != null && rangeEvents.length > 0) {
                for (const event of rangeEvents) {
                    _renderEntityRangeEvent(event, entityRow);
                }
            }
        }

        function _refreshEntityPointEvents(entityRow: EntityRow) {
            for (const container of entityRow.pointEventContainers) {
                const eventTime = container.time;
                const rowIndex = entityRow.index;
                const containerEl = container.containerEl;
                const { top, left } = _calcPointEventPosition(eventTime, rowIndex);
                containerEl.style.top = `${top}px`;
                containerEl.style.left = `${left}px`;
            }
        }

        function _renderEntityPointEvent(event: PointEvent, entityRow: EntityRow) {
            const eventTime = event.time;
            const rowIndex = entityRow.index;
            if (!isTimeInRange(eventTime))
                return;
            const containerElement = document.createElement("div");
            const { top, left } = _calcPointEventPosition(eventTime, rowIndex);
            containerElement.style.top = `${top}px`;
            containerElement.style.left = `${left}px`;
            containerElement.classList.add(CLS_MAIN_CANVAS_ENTITY_POINT_EVENT);

            if (_state.entityPointEventRender != null)
                _state.entityPointEventRender(event, _mainCanvasElement, containerElement);

            _mainCanvasElement.appendChild(containerElement);
            entityRow.pointEventContainers.push({
                time: eventTime,
                containerEl: containerElement
            });
        }

        function _calcPointEventPosition(eventTime: Date, rowIndex: number): { top: number, left: number } {
            const [renderStartTime] = trucateTimeRange(eventTime);
            const time = toMinutes(renderStartTime.valueOf() - _state.chartRenderStartTime.valueOf());
            const center = time * _state.cellWidth / _state.cellMinutes;
            const contentHeight = _getMainPointContentHeight();
            const top = (_state.cellHeight * rowIndex) + ((_state.cellHeight - contentHeight) / 2) - 1;
            const width = contentHeight;
            const left = center - (width / 2);
            return {
                left: left,
                top: top,
            };
        }

        function _refreshEntityRangeEvents(entityRow: EntityRow) {
            for (const container of entityRow.rangeEventContainers) {
                const startTime = container.startTime;
                const endTime = container.endTime;
                const rowIndex = entityRow.index;
                const { top, left, width } = _calcRangeEventPosition(startTime, endTime, rowIndex);
                container.containerEl.style.left = `${left}px`;
                container.containerEl.style.width = `${width}px`;
            }
        }

        function _calcRangeEventPosition(eventStartTime: Date, eventEndTime: Date, rowIndex: number): { top: number, left: number, width: number } {
            const [renderStartTime, renderEndTime] = trucateTimeRange(eventStartTime, eventEndTime);
            const startTime = toMinutes(renderStartTime.valueOf() - _state.chartRenderStartTime.valueOf());
            const duration = toMinutes(renderEndTime.valueOf() - renderStartTime.valueOf());
            const left = startTime * _state.cellWidth / _state.cellMinutes;
            const width = duration * _state.cellWidth / _state.cellMinutes;
            const top = (_state.cellHeight * rowIndex)
                + (_state.cellHeight - _getMainRangeContentHeight()) / 2
                - 1;
            return {
                left: left,
                top: top,
                width: width
            };
        }

        function _renderEntityRangeEvent(event: RangeEvent, entityRow: EntityRow) {
            const startTime = event.startTime;
            const endTime = event.endTime;
            const rowIndex = entityRow.index;

            if (!isTimeInRange(startTime, endTime))
                return;

            const containerElement = document.createElement("div");
            const { top, left, width } = _calcRangeEventPosition(startTime, endTime, rowIndex);
            containerElement.style.left = `${left}px`;
            containerElement.style.top = `${top}px`;
            containerElement.style.width = `${width}px`;
            containerElement.classList.add(CLS_MAIN_CANVAS_ENTITY_RANGE_EVENT);

            if (_state.entityRangeEventRender != null)
                _state.entityRangeEventRender(event, _mainCanvasElement, containerElement);

            _mainCanvasElement.appendChild(containerElement);
            entityRow.rangeEventContainers.push({
                startTime: startTime,
                endTime: endTime,
                containerEl: containerElement
            });
        }

        function _renderGlobalRangeEvents() {
            if (_data.globalRangeEvents != null && _data.globalRangeEvents.length > 0) {
                for (const event of _data.globalRangeEvents) {
                    _renderGlobalRangeEvent(event);
                }
            }
        }

        function _refreshGlobalRangeEvents() {
            for (const container of _globalRangeEventItems) {
                const startTime = container.startTime;
                const endTime = container.endTime;
                const { top, left, width } = _calcRangeEventPosition(startTime, endTime, 0);
                container.containerEl.style.left = `${left}px`;
                container.containerEl.style.width = `${width}px`;
            }
        }

        function _renderGlobalRangeEvent(event: RangeEvent) {
            const eventStartTime = event.startTime;
            const eventEndTime = event.endTime;
            if (!isTimeInRange(eventStartTime, eventEndTime))
                return;

            const { top, left, width } = _calcRangeEventPosition(eventStartTime, eventEndTime, 0);
            const containerElement = document.createElement("div");
            containerElement.style.left = `${left}px`;
            containerElement.style.width = `${width}px`;
            containerElement.classList.add(CLS_MAIN_CANVAS_GLOBAL_RANGE_EVENT);

            if (_state.globalRangeEventRender != null)
                _state.globalRangeEventRender(event, _mainCanvasElement, containerElement);

            _mainCanvasElement.appendChild(containerElement);
            _globalRangeEventItems.push({
                startTime: eventStartTime,
                endTime: eventEndTime,
                containerEl: containerElement
            });
        }

        function _zoomIn(pivotPointX?: number, pivotPointY?: number) {
            const shouldReset = _state.prevZoomDirection == "out" ||
                _state.accelResetTimeout < new Date().valueOf() - _state.lastZoomTime.valueOf();
            if (shouldReset) {
                _zoomVelocity = 0;
            }
            _zoomVelocity += _defaultZoomStep;
            const nextZoomScaleX = _currZoomScale + _zoomVelocity;
            _zoom(nextZoomScaleX, pivotPointX, pivotPointY);
            _state.prevZoomDirection = "in";
        }

        function _zoomOut(pivotPointX?: number, pivotPointY?: number) {
            const shouldReset = _state.prevZoomDirection == "in" ||
                _state.accelResetTimeout < new Date().valueOf() - _state.lastZoomTime.valueOf();
            if (shouldReset) {
                _zoomVelocity = 0;
            }
            _zoomVelocity -= _defaultZoomStep;
            const nextZoomScale = _currZoomScale + _zoomVelocity;
            _zoom(nextZoomScale, pivotPointX, pivotPointY);
            _state.prevZoomDirection = "out";
        }

        function _zoom(scale: number, pivotPointX?: number, pivotPointY?: number) {
            if (scale <= _minZoomScale)
                scale = _minZoomScale;
            if (_maxZoomScale <= scale)
                scale = _maxZoomScale;

            // 줌 후 스크롤 위치 계산
            let scrollLeft = _mainCanvasBoxElement.scrollLeft;
            let scrollTop = _mainCanvasBoxElement.scrollTop;

            if (_state.hZoomEnabled) {
                const newCellWidth = _originalCellWidth * scale;
                const prevCellWidth = _state.cellWidth;
                _state.cellWidth = newCellWidth;

                if (pivotPointX) {
                    const scrollOffset = pivotPointX - scrollLeft;
                    const newPivotPointX = pivotPointX * newCellWidth / prevCellWidth; // 기준점까지의 거리
                    scrollLeft = newPivotPointX - scrollOffset;
                }

            }
            if (_state.vZoomEnabled) {
                const prevCellHeight = _state.cellHeight;
                const newCellHeight = _originalCellHeight * scale;
                const newCellContentHeight = _state.cellContentHeightRatio * newCellHeight;
                _setCellHeight(newCellHeight);
                if (pivotPointY) {
                    const scrollOffset = pivotPointY - scrollTop;
                    const newPivotPointY = pivotPointY * newCellContentHeight / prevCellHeight; // 기준점까지의 거리
                    scrollTop = newPivotPointY - scrollOffset;
                }
            }



            // 일부 렌더링에는 마지막 줌 시간이 필요하므로 미리 저장해둔다.
            _state.lastZoomTime = new Date();
            _refresh();
            // keep scroll position
            _mainCanvasBoxElement.scrollLeft = scrollLeft;
            _mainCanvasBoxElement.scrollTop = scrollTop;

            _prevZoomScale = _currZoomScale;
            _currZoomScale = scale;
        }

        /**
         * 렌더링을 갱신한다.
         */
        function _refresh() {
            _updateElementSize();
            _refreshColumnHeaders();
            _refreshSideCanvas();
            _refreshMainCanvas();
        }

        return {
            create,
            render,
            setOptions,
            setData
        }
    };
}