declare var dayjs: any;
namespace Services.PlumChart {
    export enum SortDirection {
        ASC = "asc",
        DESC = "desc",
        NONE = "none"
    }
    /**
     * 범례
     */
    export interface Legend {
        /**
         * 범례 아이콘
         */
        icon?: string;
        /**
         * 범례 색상
         */
        color?: string;
        /**
         * css 클래스명
         */
        className?: string;
        /**
         * 범례 제목
         */
        label: string;
        /**
         * 범례 위치
         */
        location?: "left" | "right";
    }

    /**
     * 점 이벤트
     */
    export interface PointEvent {
        /**
         * 이벤트 시간
         */
        time: Date;
        /**
         * 이벤트 아이콘
         */
        icon: string;
        /**
        * css 클래스명
        */
        className?: string;
        /**
         * 이벤트 제목
         */
        title: string;
        /**
         * 이벤트 추가정보
         */
        lines: string[];
        /**
        * 이벤트 추가정보. 레이지 로딩 적용.
        * @returns 
        */
        lazyLines?: () => Promise<string[]>;
        /**
         * 툴팁 표시 여부
         */
        showTooltip: boolean;
        /**
         * 툴팁에 시간 표시 여부
         */
        showTime: boolean;
    }

    /**
     * 범위 이벤트
     */
    export interface RangeEvent {
        /**
         * 이벤트 시작시간
         */
        startTime: Date;
        /**
         * 이벤트 종료시간
         */
        endTime: Date;
        /**
         * css 클래스명
         */
        className?: string;
        /**
         * 이벤트 색상
         */
        color?: string;
        /**
         * 이벤트 제목
         */
        title: string;
        /**
         * 이벤트 추가정보
         */
        lines: string[];
        /**
         * 이벤트 추가정보. 레이지 로딩 적용.
         * @returns 
         */
        lazyLines?: () => Promise<string[]>;
        /**
         * 툴팁 표시 여부
         */
        showTooltip: boolean;
        /**
         * 툴팁에 시간 표시 여부
         */
        showTime: boolean;
    }

    export interface Entity {
        pointEvents: PointEvent[],
        rangeEvents: RangeEvent[],
    }

    export interface GridColumn {
        field: string,
        caption: string,
    }

    export interface GridColumnSort<T> {
        field: string,
        compareFn: (a: T, b: T) => number,
    }

    export class PlumChartOptions {
        formatTime?: (time: Date) => string;
        formatTimeRange?: (start: Date, end: Date) => string;
        renderCanvasColumn?: (time: Date, containerEl: HTMLElement) => HTMLElement;
        renderPointEventCustomTooltip?: (event: PointEvent, tooltipEl: HTMLElement) => void;
        renderRangeEventCustomTooltip?: (event: RangeEvent, tooltipEl: HTMLElement) => void;
        useEventHoverColor?: boolean;
        eventHoverColor?: string;
        gridColumns: GridColumn[];
        gridTitle: string;
        canvasTitle: string;
        chartStartTime: Date;
        chartEndTime: Date
        leftPanelWidth?: number = 350;
        columnTitleHeight?: number = 50;
        columnHeaderHeight?: number = 50;
        sideCanvasHeight?: number = 50;
        sideCanvasContentHeightRatio?: number = 0.8;
        cellMinutes?: number = 20;
        cellWidth?: number = 100;
        cellHeight?: number = 50;
        mainRangeContentRatio?: number = 0.9;
        mainPointContentRatio?: number = 0.8
        minZoomScale?: number = 1;
        maxZoomScale?: number = 40
        hasHorizontalLine?: boolean = true;
        hasVerticalLine?: boolean = true;
        /**
         * 컬럼 너비를 자동으로 맞출지 여부. true인 경우 셀너비 옵션이 무시된다. 현재 차트 너비에 맞춰 셀너비를 조절한다.
         */
        columnAutoWidth?: boolean = true;
        /**
         * 테이블 행에 마우스를 올렸을 때 배경색
         */
        rowHoverColor?: string = "#ddd";

        /**
         * 컨트롤러 고정 여부
         */
        fixedController?: boolean = true;

        /**
         * 컨트롤러 위치. 고정 컨트롤러인 경우에만 사용한다.
         */
        controllerLocation?: Services.PlumChart.Core.ControllerLocation = "bottomRight";
    }

    export interface PlumChartData {
        /**
         * 범례 목록
         */
        legends: Legend[],
        /**
         * 엔티티 목록
         */
        entities: Entity[],
        /**
         * 보조 점 이벤트 목록
         */
        sidePointEvents: PointEvent[],
        /**
         * 전역 범위 이벤트 목록
         */
        globalRangeEvents: RangeEvent[],
    }
    const CLS_ROOT_CONTAINER = "pl-root-container";
    const CLS_LEGEND_CONTAINER = "pl-legend-container";
    const CLS_CHART_CONTAINER = "pl-chart-container";

    const CLS_LEGENDS = "pl-legends";
    const CLS_LEGENDS_LEFT = "pl-legends-left";
    const CLS_LEGENDS_RIGHT = "pl-legends-right";
    const CLS_LEGEND = "pl-legend";
    const CLS_LEGEND_ICON = "pl-legend-icon";
    const CLS_LEGEND_LABEL = "pl-legend-label";

    const CLS_GRID_TITLE = "pl-grid-title";
    const CLS_GRID_COLUMNS = "pl-grid-columns";
    const CLS_GRID_COLUMN = "pl-grid-column";
    const CLS_GRID_COLUMN_CAPTION = "pl-grid-column-caption";
    const CLS_GRID_COLUMN_ICON = "pl-grid-column-icon";

    const CLS_GRID_ROW = "pl-grid-row";
    const CLS_GRID_CELL = "pl-grid-cell";

    const CLS_TOOLTIP = "pl-tooltip";
    const CLS_TOOLTIP_TITLE = "pl-tooltip-title";
    const CLS_TOOLTIP_VISIBLE = "pl-tooltip-visible";
    const CLS_TOOLTIP_INVISIBLE = "pl-tooltip-invisible";

    const CLS_CANVAS_TITLE = "pl-canvas-title";
    const CLS_CANVAS_COLUMN = "pl-canvas-column";

    const CLS_ENTITY_POINT_EVENT = "pl-entity-point-event";
    const CLS_ENTITY_RANGE_EVENT = "pl-entity-range-event";
    const CLS_GLOBAL_RANGE_EVENT = "pl-global-range-event";


    export function PlumChart() {
        /**
         * PlumChart컨테이너 엘리먼트
         */
        let _containerEl: HTMLElement;

        /**
         * 타임라인 차트
         */
        let _coreChart: ReturnType<typeof Services.PlumChart.Core.CoreChart>;

        /**
         * 범례 엘리먼트
         */
        let _legendsEl: HTMLElement;

        /**
         * 범례 목록 
         */
        let _legends: Legend[] = [];
        /**
         * 엔티티 데이터
         */
        let _entities: Entity[] = [];

        /**
         * 엔티티 백업 데이터
         */
        let _entitiesBackup: Entity[] = [];

        /**
         * 보조 점 이벤트 데이터
         */
        let _sidePointEvents: PointEvent[] = [];

        /**
         * 전역 범위 이벤트 데이터
         */
        let _globalRangeEvents: RangeEvent[] = [];

        /**
         * 고정된 툴팁 목록. key: 툴팁 컨테이너 엘리먼트, value: 툴팁 엘리먼트
         */
        const _fixedTooltipMap = new Map<HTMLElement, HTMLElement>();

        /**
         * 그리드 컬럼 목록. key: 그리드컬럼, value: 그리드컬럼 엘리먼트
         */
        let _gridColumnMap: Map<GridColumn, HTMLElement> = new Map();

        let _gridColumnSorts: GridColumnSort<Entity>[] = [];

        let _sortDirection = SortDirection.NONE;
        let _sortColumnField = "";

        /**
         * 캔버스 이벤트 호버시 배경색을 변경한다.
         */
        let _useEventHoverColor = false;

        /**
         * 캔버스 이벤트 호버시 배경색
         */
        let _eventHoverColor = "#333";

        let _formatTime: (time: Date) => string;
        /**
         * 시간범위를 문자열로 변환한다.
         */
        let _formatTimeRange: (start: Date, end: Date) => string;
        /**
         * 점 이벤트 툴팁 커스텀 렌더링 함수
         */
        let _customPointEventTooltip: (event: PointEvent, eventEl: HTMLElement, tooltipEl: HTMLElement) => void = null;
        /**
         * 범위 이벤트 툴팁 커스텀 렌더링 함수
         */
        let _customRangeEventTooltip: (event: RangeEvent, eventEl: HTMLElement, tooltipEl: HTMLElement) => void = null;


        function create(containerEl: HTMLElement) {
            _containerEl = containerEl;
            _legendsEl = _createLegendEl();
            _coreChart = Services.PlumChart.Core.CoreChart();

            const rootEl = document.createElement("div");
            rootEl.classList.add(CLS_ROOT_CONTAINER);

            const legendContainerEl = document.createElement("div");
            legendContainerEl.classList.add(CLS_LEGEND_CONTAINER);
            legendContainerEl.appendChild(_legendsEl);
            rootEl.appendChild(legendContainerEl);

            const chartContainerEl = document.createElement("div");
            chartContainerEl.classList.add(CLS_CHART_CONTAINER);
            _coreChart.create(chartContainerEl);
            rootEl.appendChild(chartContainerEl);

            _containerEl.appendChild(rootEl);
        }

        /**
         * 기본 시간범위 문자열 변환 함수
         * @param start 
         * @param end 
         * @returns 
         */
        function _defaultFormatTimeRange(start: Date, end: Date): string {
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

            let timeDiffString = '';
            if (years > 0) {
                timeDiffString = timeDiffString + years + "년";
            }
            if (months > 0) {
                timeDiffString = timeDiffString + months + "개월";
            }
            if (days > 0) {
                timeDiffString = timeDiffString + days + "일";
            }
            if (hours > 0) {
                timeDiffString = timeDiffString + hours + "시간";
            }
            if (minutes > 0) {
                timeDiffString = timeDiffString + minutes + "분";
            }
            if (seconds > 0) {
                timeDiffString = timeDiffString + seconds + "초";
            }
            if (timeDiffString === '')
                timeDiffString = '0초';
            return timeDiffString;
        }

        /**
         * 기본 시간 문자열 변환 함수
         * @param time 
         * @returns 
         */
        function _defaultFormatTime(time: Date): string {
            return dayjs(time).format("HH:mm:ss");
        }

        /**
         * 캔버스 컬럼을 기본 렌더링한다.
         * @param time 
         * @param containerEl 
         * @returns 
         */
        function _defaultRenderCanvasColumn(time: Date, containerEl: HTMLElement): HTMLElement {
            const divElement = document.createElement("div");
            divElement.classList.add(CLS_CANVAS_COLUMN);
            divElement.innerText = dayjs(time).format("HH:mm");
            containerEl.appendChild(divElement);
            return divElement;
        };

        /**
         * 그리드 셀에 마우스 호버시 배경색을 변경한다.
         * @param eventEl 
         * @returns 
         */
        function _setEventHoverColor(eventEl: HTMLElement) {
            const originalColor = eventEl.style.backgroundColor;
            eventEl.addEventListener("mouseenter", (e) => {
                eventEl.style.backgroundColor = _eventHoverColor;
            });
            eventEl.addEventListener("mouseleave", (e) => {
                eventEl.style.backgroundColor = originalColor;
            });
        }

        function _showTooltip(tooltipEl: HTMLElement) {
            tooltipEl.classList.add(CLS_TOOLTIP_VISIBLE);
            tooltipEl.classList.remove(CLS_TOOLTIP_INVISIBLE);
        }

        function _hideTooltip(tooltipEl: HTMLElement) {
            tooltipEl.classList.add(CLS_TOOLTIP_INVISIBLE);
            tooltipEl.classList.remove(CLS_TOOLTIP_VISIBLE);
        }

        /**
         * 마우스위치에 맞춰 툴팁 위치를 조정한다.
         * @param tooltipElement 
         * @param evt 
         */
        function _relocateTooltip(tooltipElement: HTMLElement, evt?: MouseEvent) {
            const mouseEvent: MouseEvent = evt ?? (tooltipElement as any).tag;
            if (!mouseEvent)
                return;
            (tooltipElement as any).tag = evt;

            const locationOffset = 10;
            const tooltipClientRect = tooltipElement.getBoundingClientRect();

            // 툴팁이 윈도우 높이보다 길면 최대 높이를 윈도우 높이로 설정한다.
            const tooltipHeight = tooltipClientRect.height;
            const windowInnerHeight = window.innerHeight - locationOffset * 2;
            if (tooltipHeight >= windowInnerHeight) {
                tooltipElement.style.maxHeight = windowInnerHeight + "px";
            } else {
                tooltipElement.style.maxHeight = "";
            }

            let clientX = mouseEvent.clientX;
            let clientY = mouseEvent.clientY;
            let left = clientX + locationOffset;
            let top = clientY + locationOffset;

            // 마우스 x좌표 + 툴팁너비 + offset  이 윈도우 너비보다 크면 좌측방향으로 툴팁을 위치한다.
            if (clientX + locationOffset + tooltipElement.offsetWidth > window.innerWidth) {
                left = Math.max(locationOffset, clientX - tooltipElement.offsetWidth - locationOffset);
            }
            // 윈도우 높이보다 툴팁이 길면 툽팁 y좌표를 조정한다.
            if (window.innerHeight < clientY + tooltipElement.offsetHeight + locationOffset) {
                top = Math.max(locationOffset, window.innerHeight - tooltipElement.offsetHeight - locationOffset);
            }
            tooltipElement.style.top = top + "px";
            tooltipElement.style.left = left + "px";


        };

        /**
         * 툴팁이 고정되어있는지 여부를 반환한다.
         * @param tooltipContainerEl
         * @returns 
         */
        function _isTooltipFixed(tooltipContainerEl: HTMLElement) {
            return _fixedTooltipMap.has(tooltipContainerEl);
        }

        /**
         * 엘리먼트에 툴팁을 추가한다.
         * @param containerEl 툴팁을 적용할 엘리먼트
         * @param tooltipEl 툴팁 엘리먼트
         * @param fixEvent 툴팁을 고정할 이벤트
         */
        function _addTooltip(containerEl: HTMLElement, tooltipEl: HTMLElement, fixEvent: "click" | "dblclick" = "dblclick") {
            // 마우스 이동시 툴팁 위치를 조정한다.
            containerEl.addEventListener("mousemove", (e) => {
                if (e.target !== containerEl) {
                    return;
                }
                if (_isTooltipFixed(containerEl))
                    return;
                _relocateTooltip(tooltipEl, e);
            });
            // 마우스가 엘리먼트를 벗어나면 툴팁을 숨긴다.
            containerEl.addEventListener("mouseleave", (e) => {
                if (_isTooltipFixed(containerEl))
                    return;
                _hideTooltip(tooltipEl);
            });
            // 마우스가 엘리먼트에 들어오면 툴팁을 보여준다.
            // mouseenter이벤트만 발생하고 mousemove이벤트가 발생하지 않는 경우가 있다. ex) 휠스크롤
            // mouseenter이벤트순간부터 툴팁위치를 조정한다.
            containerEl.addEventListener("mouseenter", (e) => {
                if (_isTooltipFixed(containerEl))
                    return;
                _showTooltip(tooltipEl);
                _relocateTooltip(tooltipEl, e);
            });
            // 마우스 클릭/더블클릭시 툴팁을 고정한다.
            containerEl.addEventListener(fixEvent, (e) => {
                e.stopPropagation();
                if (_isTooltipFixed(containerEl)) {
                    _hideTooltip(tooltipEl);
                    _fixedTooltipMap.delete(containerEl);
                } else {
                    _showTooltip(tooltipEl);
                    _fixedTooltipMap.set(containerEl, tooltipEl);
                }
            });
            // 툴팁 클릭시 캔버스 클릭 이벤트가 발생하지 않도록 한다. 캔버스 이동, 툴팁 숨김 기능이 동작하지 않도록 한다.
            tooltipEl.addEventListener("click", (e) => {
                e.stopPropagation();
            });
            // 툴팁에서 마우스 이동 이벤트전파를 중단한다. 툴팁 숨김 기능이 동작하지 않도록 한다.
            tooltipEl.addEventListener("mousemove", (e) => {
                e.stopPropagation();
            });
        }

        /**
         * 추가 정보 엘리먼트를 툴팁에 추가한다.
         * @param line 
         * @param tooltipEl 
         * @returns 
         */
        function _renderLineElement(line: string, tooltipEl: HTMLElement): HTMLElement {
            const lineEl = document.createElement("div");
            lineEl.innerText = line;
            tooltipEl.appendChild(lineEl);
            return lineEl;
        }

        function _renderDefaultPointEventTooltip(event: PointEvent, eventEl: HTMLElement, tooltipEl: HTMLElement) {
            const titleEl = document.createElement("div");
            titleEl.classList.add(CLS_TOOLTIP_TITLE);
            titleEl.innerText = event.title;
            tooltipEl.appendChild(titleEl);

            if (event.showTime) {
                const timeEl = document.createElement("div");
                timeEl.innerText = _formatTime(event.time);
                tooltipEl.appendChild(timeEl);
            }

            for (const line of event.lines) {
                _renderLineElement(line, tooltipEl);
            }

            let lazyLoaded = false;
            eventEl.addEventListener("mouseenter", async (e) => {
                if (!event.lazyLines)
                    return;
                if (lazyLoaded)
                    return;
                lazyLoaded = true;
                const lazyLines = await event.lazyLines();
                for (const line of lazyLines) {
                    _renderLineElement(line, tooltipEl);
                }
                _relocateTooltip(tooltipEl);
            });
        }

        async function _renderPointEvent(event: PointEvent, canvasEl: HTMLElement, containerEl: HTMLElement, classNames: { img: string }) {
            const imgEl = document.createElement("img");
            imgEl.classList.add(classNames.img);
            imgEl.src = event.icon;
            if (event.className) {
                imgEl.classList.add(event.className);
            }
            containerEl.appendChild(imgEl);

            const tooltipEl = document.createElement("div");
            tooltipEl.classList.add(CLS_TOOLTIP);
            canvasEl.appendChild(tooltipEl);

            if (_customPointEventTooltip) {
                _customPointEventTooltip(event, imgEl, tooltipEl);
            } else {
                _renderDefaultPointEventTooltip(event, imgEl, tooltipEl);
            }

            if (event.showTooltip) {
                _addTooltip(imgEl, tooltipEl);
            }
            if (_useEventHoverColor) {
                _setEventHoverColor(imgEl);
            }
        }

        function _renderDefaultRangeEventTooltip(event: RangeEvent, eventEl: HTMLElement, tooltipEl: HTMLElement) {
            const titleEl = document.createElement("div");
            titleEl.classList.add(CLS_TOOLTIP_TITLE);
            titleEl.innerText = event.title;
            tooltipEl.appendChild(titleEl);

            if (event.showTime) {
                const startTime = _formatTime(event.startTime);
                const endTime = _formatTime(event.endTime);
                const timeRange = _formatTimeRange(event.startTime, event.endTime);
                const timeEl = document.createElement("div");
                timeEl.innerText = `${startTime} ~ ${endTime} (${timeRange})`;
                tooltipEl.appendChild(timeEl);
            }

            for (const line of event.lines) {
                _renderLineElement(line, tooltipEl);
            }

            let lazyLoaded = false;
            eventEl.addEventListener("mouseenter", async (e) => {
                if (!event.lazyLines)
                    return;
                if (lazyLoaded)
                    return;
                lazyLoaded = true;
                const lazyLines = await event.lazyLines();
                for (const line of lazyLines) {
                    _renderLineElement(line, tooltipEl);
                }
                _relocateTooltip(tooltipEl);
            });
        }


        async function _renderRangeEvent(event: RangeEvent, canvasEl: HTMLElement, containerEl: HTMLElement, classNames: { box: string }) {
            const boxEl = document.createElement("div");
            boxEl.classList.add(classNames.box);
            boxEl.classList.add(event.className);
            if (event.color) {
                boxEl.style.backgroundColor = event.color;
            }
            if (event.className) {
                boxEl.classList.add(event.className);
            }
            containerEl.appendChild(boxEl);

            const tooltipEl = document.createElement("div");
            tooltipEl.classList.add(CLS_TOOLTIP);
            canvasEl.appendChild(tooltipEl);

            if (_customRangeEventTooltip) {
                _customRangeEventTooltip(event, boxEl, tooltipEl);
            } else {
                _renderDefaultRangeEventTooltip(event, boxEl, tooltipEl);
            }

            if (event.showTooltip) {
                _addTooltip(boxEl, tooltipEl);
            }
            if (_useEventHoverColor) {
                _setEventHoverColor(boxEl);
            }
        }

        /**
         * 엔티티 점 이벤트를 기본 렌더링한다.
         * @param event 
         * @param canvasEl 
         * @param containerEl 
         */
        async function _defaultRenderEntityPointEvent(event: PointEvent, canvasEl: HTMLElement, containerEl: HTMLElement) {
            _renderPointEvent(event, canvasEl, containerEl, {
                img: CLS_ENTITY_POINT_EVENT,
            });
        };

        /**
         * 엔티티 범위 이벤트를 렌더링한다.
         * @param event 
         * @param canvasEl 
         * @param containerEl 
         */
        async function _defaultRenderEntityRangeEvent(event: RangeEvent, canvasEl: HTMLElement, containerEl: HTMLElement) {
            _renderRangeEvent(event, canvasEl, containerEl, {
                box: CLS_ENTITY_RANGE_EVENT,
            });
        };

        /**
         * 보조 점 이벤트를 렌더링한다.
         * @param event 
         * @param canvasEl 
         * @param containerEl 
         */
        function _defaultRenderSidePointEvent(event: PointEvent, canvasEl: HTMLElement, containerEl: HTMLElement) {
            // 엔티티 점 이벤트와 동일하게 렌더링한다.
            _defaultRenderEntityPointEvent(event, canvasEl, containerEl);
        };

        /**
         * 전역 범위 이벤트를 렌더링한다.
         * @param event
         * @param canvasEl 
         * @param containerEl 
         */
        async function _defaultRenderGlobalRangeEvent(event: RangeEvent, canvasEl: HTMLElement, containerEl: HTMLElement) {
            _renderRangeEvent(event, canvasEl, containerEl, {
                box: CLS_GLOBAL_RANGE_EVENT
            });
        };

        /**
         * 메인 타이틀을 렌더링한다.
         * @param containerEl 
         * @param title 
         */
        function _defaultRenderGridTitle(containerEl: HTMLElement, title: string) {
            const titleEl = document.createElement("div");
            titleEl.classList.add(CLS_GRID_TITLE);
            titleEl.innerText = title;
            containerEl.appendChild(titleEl);
        }

        function _defaultRenderGridColumns(containerElement: HTMLElement) {
            const gridColumnsEl = document.createElement("div");
            gridColumnsEl.classList.add(CLS_GRID_COLUMNS);
            containerElement.appendChild(gridColumnsEl);

            let columnIdx = 0;
            for (const column of _gridColumnMap.keys()) {
                const columnEl = _createColumn(gridColumnsEl, columnIdx++, column.caption);
                gridColumnsEl.appendChild(columnEl);
                _gridColumnMap.set(column, columnEl);
            }

            for (const [column, columnEl] of _gridColumnMap.entries()) {
                columnEl.addEventListener("click", (e) => {
                    const selectedField = column.field;

                    if (_sortColumnField != selectedField) {
                        _sortDirection = SortDirection.ASC;
                    }
                    else {
                        if (_sortDirection == SortDirection.ASC) {
                            _sortDirection = SortDirection.DESC;
                        } else if (_sortDirection == SortDirection.DESC) {
                            _sortDirection = SortDirection.NONE;
                        } else {
                            _sortDirection = SortDirection.ASC;
                        }
                    }
                    _sortColumnField = selectedField;

                    for (const columnEl of _gridColumnMap.values()) {
                        _updateColumnIcon(columnEl, SortDirection.NONE);
                    }
                    _updateColumnIcon(columnEl, _sortDirection);
                    _sortEntities(selectedField, _sortDirection);

                    const sortEvent = new CustomEvent("sort", { detail: { field: selectedField, direction: _sortDirection } });
                    window.dispatchEvent(sortEvent);
                });
            }

        }

        function _createColumn(containerEl: HTMLElement, index: number, caption: string): HTMLElement {
            const columnEl = document.createElement("div");
            columnEl.classList.add(CLS_GRID_COLUMN);
            columnEl.setAttribute("data-index", index.toString());

            const captionEl = document.createElement("div");
            captionEl.classList.add(CLS_GRID_COLUMN_CAPTION);
            captionEl.innerText = caption;
            columnEl.appendChild(captionEl);

            const icon = document.createElement("div");
            icon.classList.add(CLS_GRID_COLUMN_ICON);
            columnEl.appendChild(icon);

            containerEl.appendChild(columnEl);
            return columnEl;
        }

        /**
         * 정렬방향에 따라 컬럼의 아이콘을 업데이트한다.
         * @param columnEl 
         * @param sortDirection 
         */
        function _updateColumnIcon(columnEl: HTMLElement, sortDirection: SortDirection) {
            const icon = columnEl.getElementsByClassName(CLS_GRID_COLUMN_ICON)[0];
            if (sortDirection == SortDirection.ASC) {
                icon.innerHTML = "&#9650;";
            } else if (sortDirection == SortDirection.DESC) {
                icon.innerHTML = "&#9660;";
            } else {
                icon.innerHTML = "";
            }
        }

        /**
         * 엔티티를 정렬한다. 그리드 및 캔버스를 정렬한다.
         * @param columnField 
         * @param sortDirection 
         * @returns 
         */
        function _sortEntities(columnField: string, sortDirection: SortDirection) {
            let sortedEntities = [..._entitiesBackup];

            if (sortDirection == SortDirection.NONE) {
                _coreChart.setData({
                    entities: sortedEntities,
                    sidePointEvents: _sidePointEvents,
                    globalRangeEvents: _globalRangeEvents
                });
                _coreChart.renderCanvas();
                return;
            }

            const gridColumnSort = _gridColumnSorts.find((sort) => sort.field == columnField);
            if (gridColumnSort) {
                sortedEntities = _entities.sort(gridColumnSort.compareFn);
            }
            _coreChart.setData({
                entities: sortedEntities,
                sidePointEvents: _sidePointEvents,
                globalRangeEvents: _globalRangeEvents
            });

            _coreChart.setData({
                entities: sortedEntities,
                sidePointEvents: _sidePointEvents,
                globalRangeEvents: _globalRangeEvents
            });
            _coreChart.renderCanvas();
        }

        /**
         * 그리드 행을 렌더링한다
         * @param entity 
         * @param containerEl 
         */
        function _defaultRenderGridRow(entity: Entity, containerEl: HTMLElement) {
            containerEl.classList.add(CLS_GRID_ROW);

            let index = 0;
            for (const column of _gridColumnMap.keys()) {
                const itemEl = document.createElement("div");
                itemEl.setAttribute("data-index", (index++).toString());
                itemEl.classList.add(CLS_GRID_CELL);
                itemEl.innerText = ((entity as any)[column.field] as object).toString() ?? "";
                containerEl.appendChild(itemEl);
            }
        }

        /**
         * 캔버스 타이틀을 렌더링한다.
         * @param containerEl
         * @param title 
         */
        function _renderCanvasTitle(containerEl: HTMLElement, title: string) {
            const titleEl = document.createElement("div");
            titleEl.classList.add(CLS_CANVAS_TITLE);
            titleEl.innerText = title;
            containerEl.appendChild(titleEl);
        }

        let isMainCanvasCostomized = false;

        /**
         * 타임라인 차트 엘리먼트를 커스터마이징한다.
         * @param elements
         * @returns 
         */
        function _customizeElements(elements: { rootElement: HTMLElement }) {
            if (isMainCanvasCostomized)
                return;

            // 캔버스 클릭시 툴팁을 숨긴다.
            elements.rootElement.addEventListener("click", (e) => {
                for (const [containerEl, tooltipEl] of _fixedTooltipMap.entries()) {
                    _hideTooltip(tooltipEl);
                }
                _fixedTooltipMap.clear();
            });
            isMainCanvasCostomized = true;
        }

        function _createLegendEl() {
            const box = document.createElement("div");
            box.classList.add(CLS_LEGENDS);

            const leftBox = document.createElement("div");
            leftBox.classList.add(CLS_LEGENDS_LEFT);

            const rightBox = document.createElement("div");
            rightBox.classList.add(CLS_LEGENDS_RIGHT);

            box.appendChild(leftBox);
            box.appendChild(rightBox);
            return box;
        }

        function _renderLegends() {
            if (!_legends)
                return;
            const leftBox = _legendsEl.getElementsByClassName(CLS_LEGENDS_LEFT)[0];
            const rightBox = _legendsEl.getElementsByClassName(CLS_LEGENDS_RIGHT)[0];
            leftBox.replaceChildren();
            rightBox.replaceChildren();
            for (const item of _legends) {
                const box = document.createElement("div");
                box.classList.add(CLS_LEGEND);
                if (item.location == "left" || item.location == null) {
                    leftBox.appendChild(box);
                }
                else {
                    rightBox.appendChild(box);
                }

                const icon = document.createElement("div");
                icon.classList.add(CLS_LEGEND_ICON);
                if (item.icon) {
                    icon.style.backgroundImage = `url(${item.icon})`;
                    icon.style.backgroundSize = "contain";
                }
                if (item.color)
                    icon.style.backgroundColor = item.color;
                if (item.className)
                    icon.classList.add(item.className);

                const label = document.createElement("div");
                label.classList.add(CLS_LEGEND_LABEL);
                label.innerText = item.label;

                box.appendChild(icon);
                box.appendChild(label);
            }
        }

        function setOptions(options: PlumChartOptions) {
            _useEventHoverColor = options.useEventHoverColor ?? _useEventHoverColor;
            _eventHoverColor = options.eventHoverColor ?? _eventHoverColor;
            _formatTime = options.formatTime ?? _defaultFormatTime;
            _formatTimeRange = options.formatTimeRange ?? _defaultFormatTimeRange;
            _gridColumnMap.clear();
            options.gridColumns?.forEach((column) => {
                _gridColumnMap.set(column, null);
            });
            _gridColumnSorts = options.gridColumns?.map((column) => {
                return {
                    field: column.field,
                    compareFn: (a, b) => {
                        const aText = ((a as any)[column.field] as object)?.toString();
                        const bText = ((b as any)[column.field] as object)?.toString();
                        const sign = _sortDirection == SortDirection.ASC ? 1 : -1;
                        return sign * aText.localeCompare(bText);
                    }
                };
            }) ?? [];

            _customPointEventTooltip = options.renderPointEventCustomTooltip ?? _customPointEventTooltip;
            _customRangeEventTooltip = options.renderRangeEventCustomTooltip ?? _customRangeEventTooltip;

            const coreOptions: Services.PlumChart.Core.ChartOptions = {
                mainTitle: options.gridTitle,
                columnTitle: options.canvasTitle,
                chartStartTime: options.chartStartTime,
                chartEndTime: options.chartEndTime,
                columnTitleHeight: options.columnTitleHeight,
                columnHeaderHeight: options.columnHeaderHeight,
                sideCanvasHeight: options.sideCanvasHeight,
                sideCanvasContentHeightRatio: options.sideCanvasContentHeightRatio,
                cellMinutes: options.cellMinutes,
                cellWidth: options.cellWidth,
                cellHeight: options.cellHeight,
                mainRangeContentRatio: options.mainRangeContentRatio,
                mainPointContentRatio: options.mainPointContentRatio,
                maxZoomScale: options.maxZoomScale,
                hasHorizontalLine: options.hasHorizontalLine,
                hasVerticalLine: options.hasVerticalLine,
                columnAutoWidth: options.columnAutoWidth,
                rowHoverColor: options.rowHoverColor,
                fixedController: options.fixedController,
                controllerLocation: options.controllerLocation,
                hZoomEnabled: true,
                vZoomEnabled: false,
                paddingCellCount: 0,
                leftPanelWidth: 350,
                buttonScrollStepX: 400,
                buttonScrollStepY: 400,
                sidePointEventRender: _defaultRenderSidePointEvent,
                tableRowRender: _defaultRenderGridRow,
                entityPointEventRender: _defaultRenderEntityPointEvent,
                entityRangeEventRender: _defaultRenderEntityRangeEvent,
                headerCellRender: _defaultRenderCanvasColumn,
                globalRangeEventRender: _defaultRenderGlobalRangeEvent,
                mainTitleRender: _defaultRenderGridTitle,
                tableColumnRender: _defaultRenderGridColumns,
                columnTitleRender: _renderCanvasTitle,
                customizeElements: _customizeElements,
                borderColor: "#333c77",
                canvasLineColor: "#e1edf8",
            };
            _coreChart.setOptions(coreOptions);
        }

        function setData(data: PlumChartData) {
            _legends = data.legends;
            _entities = data.entities;
            _entitiesBackup = _entities.map((entity) => {
                return {
                    ...entity,
                    pointEvents: [...entity.pointEvents],
                    rangeEvents: [...entity.rangeEvents]
                };
            });

            _sidePointEvents = data.sidePointEvents;
            _globalRangeEvents = data.globalRangeEvents;

            _coreChart.setData({
                entities: _entities,
                sidePointEvents: _sidePointEvents,
                globalRangeEvents: _globalRangeEvents
            });
        }

        function setLegends(legends: Legend[]) {
            _legends = legends;
        }

        function setEntities(entities: Entity[]) {
            _entities = entities;
            _coreChart.setData({
                entities: _entities,
                sidePointEvents: _sidePointEvents,
                globalRangeEvents: _globalRangeEvents
            });
        }
        function setSidePointEvents(sidePointEvents: PointEvent[]) {
            _sidePointEvents = sidePointEvents;
            _coreChart.setData({
                entities: _entities,
                sidePointEvents: _sidePointEvents,
                globalRangeEvents: _globalRangeEvents
            });
        }
        function setGlobalRangeEvents(globalRangeEvents: RangeEvent[]) {
            _globalRangeEvents = globalRangeEvents;
            _coreChart.setData({
                entities: _entities,
                sidePointEvents: _sidePointEvents,
                globalRangeEvents: _globalRangeEvents
            });
        }


        function render() {
            isMainCanvasCostomized = false;
            _renderLegends();
            _coreChart.render();
        }

        function renderCanvas() {
            _coreChart.renderCanvas();
        }

        function getCoreChart() {
            return _coreChart;
        }

        return {
            create,
            setOptions,
            setData,
            setLegends,
            setEntities,
            setSidePointEvents,
            setGlobalRangeEvents,

            render,
            renderCanvas,
            getCoreChart
        }
    }
}