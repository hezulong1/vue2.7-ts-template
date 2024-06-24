export default {
  ID: 'en-US',
  name: 'en',
  /**
   * @version 2.15.14
   */
  el: {
    colorpicker: {
      confirm: 'OK',
      clear: 'Clear',
    },
    datepicker: {
      now: 'Now',
      today: 'Today',
      cancel: 'Cancel',
      clear: 'Clear',
      confirm: 'OK',
      selectDate: 'Select date',
      selectTime: 'Select time',
      startDate: 'Start Date',
      startTime: 'Start Time',
      endDate: 'End Date',
      endTime: 'End Time',
      prevYear: 'Previous Year',
      nextYear: 'Next Year',
      prevMonth: 'Previous Month',
      nextMonth: 'Next Month',
      year: '',
      month1: 'January',
      month2: 'February',
      month3: 'March',
      month4: 'April',
      month5: 'May',
      month6: 'June',
      month7: 'July',
      month8: 'August',
      month9: 'September',
      month10: 'October',
      month11: 'November',
      month12: 'December',
      week: 'week',
      weeks: {
        sun: 'Sun',
        mon: 'Mon',
        tue: 'Tue',
        wed: 'Wed',
        thu: 'Thu',
        fri: 'Fri',
        sat: 'Sat',
      },
      months: {
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Apr',
        may: 'May',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Aug',
        sep: 'Sep',
        oct: 'Oct',
        nov: 'Nov',
        dec: 'Dec',
      },
    },
    select: {
      loading: 'Loading',
      noMatch: 'No matching data',
      noData: 'No data',
      placeholder: 'Select',
    },
    cascader: {
      noMatch: 'No matching data',
      loading: 'Loading',
      placeholder: 'Select',
      noData: 'No data',
    },
    pagination: {
      goto: 'Go to',
      pagesize: '/page',
      total: 'Total {total}',
      pageClassifier: '',
    },
    messagebox: {
      title: 'Message',
      confirm: 'OK',
      cancel: 'Cancel',
      error: 'Illegal input',
    },
    upload: {
      deleteTip: 'press delete to remove',
      delete: 'Delete',
      preview: 'Preview',
      continue: 'Continue',
    },
    table: {
      emptyText: 'No Data',
      confirmFilter: 'Confirm',
      resetFilter: 'Reset',
      clearFilter: 'All',
      sumText: 'Sum',
    },
    tree: {
      emptyText: 'No Data',
    },
    transfer: {
      noMatch: 'No matching data',
      noData: 'No data',
      titles: ['List 1', 'List 2'], // to be translated
      filterPlaceholder: 'Enter keyword', // to be translated
      noCheckedFormat: '{total} items', // to be translated
      hasCheckedFormat: '{checked}/{total} checked', // to be translated
    },
    image: {
      error: 'FAILED',
    },
    pageHeader: {
      title: 'Back', // to be translated
    },
    popconfirm: {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    },
    empty: {
      description: 'No Data',
    },
  },

  lang: {
    // 基础区
    pageTitle: 'Slide Viewer',
    yes: 'Yes',
    cancel: 'Cancel',
    save: 'Save',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    close: 'Close',
    open: 'Open',
    off: 'Off',
    on: 'On',
    clean: 'Clean',
    move: 'Move',
    title: 'Title',
    content: 'Content',
    saving: 'Saving...',
    successAdd: 'Add successfully!',
    successEdit: 'Save successfully!',
    successSave: 'Save successfully!',
    successDelete: 'Delete successfully!',
    loadingText: 'Loading...',
    downloading: 'Downloading...',
    waiting: 'Initialization is not complete. Please try again later...',
    colon: ': ',
    // 功能区
    openSidebar: 'SideBar',
    closeSidebar: 'SideBar',
    userSet: 'Personalisation',
    showSet: 'Function Display Settings',
    readSet: 'Viewing Preferences Settings',
    cutSet: 'Screenshots Settings',
    cutType: 'Screenshot Mode',
    cutSize: 'Screenshot Size',
    qpInfo: 'Slide Info',
    caseInfo: 'Case Info',
    touchMode: 'Touchscreen Mode',
    fontBig: 'Big',
    fontSmall: 'Small',
    fullPage: 'Fullscreen',
    export: 'Export',
    isExporting: 'Exporting File...',
    allQps: 'All Slides',
    screenshots: 'ScreenShots',
    quitFullScreen: 'Press Esc to exit full screen',
    noSupport: 'Function not supported, please press F11!',
    noSupport2: 'Function not supported, please press Esc!',
    slideName: 'File Name',
    slideSize: 'File Size',
    imagePixel: 'Image Pixels',
    scanRate: 'Multiple Of Lense',
    resolution: 'Resolution',
    touchOff: 'Touchscreen Disabled',
    touchOn: 'Touchscreen Enabled',
    touchNoticeTitle: 'Touchscreen Notice',
    touchNoticeContent: 'Your browser is currently in touchscreen mode and can be turned off with the "Touchscreen Button".',
    wrongAddress: 'Invalid address',
    cutDes: 'Capture Description',
    cutReq: 'Up to 200 characters',
    wrongCut: 'Description should not exceed 200 words!',
    annotation: 'Annotation',
    anoShape: 'Shape',
    anoColor: 'Color',
    anoList: 'Annotations',
    expertAno: 'Export',
    noAnnotation: 'This slide has no annotation!',
    imgAdjust: 'ImageAdjust',
    gamma: 'Gamma',
    contrast: 'Contrast',
    bright: 'Bright',
    rgb: 'RGB',
    red: 'Red',
    green: 'Green',
    blue: 'Blue',
    kis: 'Kis',
    // reset: 'Reset',
    all: 'RGB',
    otherFunc: 'More Functions',
    noticeSliceDeepTitle: 'Tips',
    noticeSliceDeep: 'This slide needs to be activated. Please try again in about 5 minutes...',
    noticeEditAno: 'Please finish drawing!', // annotation.js
    noticeSizeAno: 'The area is too small, please draw again!',
    // noticeSizeAno2: 'The area is too small, please draw again!',
    editPoint: 'Resize',
    movePoint: 'Move',
    closePoint: 'Finish',
    dragBar: 'Move Toolbar',
    manual: 'Manual',
    backStep: 'BackStep',
    titleReq: 'Up to 20 characters',
    contentReq: 'Up to 100 characters',
    editAno: 'Annotation Info',
    color: 'Color',
    titleWarn: 'Title length should not exceed 20 characters!',
    contentWarn: 'Content length should not exceed 100 characters!',
    noTitle: 'No Title',
    length2: 'Length',
    width2: 'Width',
    height2: 'Height',
    area2: 'Area',
    failLoadAnoList: 'Failed to load annotations!',
    saveWarn: 'Please finish drawing curve！',
    noticeMeasure: 'Click  button again to quit!',
    warnMeasure: 'Unable to do other operations during measuring! Click button again to quit!',
    nav: 'NavigationMap',
    markNav: 'MarkNav',
    sizeRuler: 'Ruler',
    rateRuler: 'Multiple',
    arrowMove: 'Arrow Keys',
    label: 'Label',
    circle: 'Circle',
    rect: 'Rectangular',
    polygon: 'Polygon',
    flag: 'Point',
    ellipse: 'Ellipse',
    lines: 'Measure',
    line: 'Line',
    curve: 'Curve',
    arrow: 'Arrow',
    radio: 'Radio',
    editPolygon: 'Editable Polygon',
    square: 'Square',
    anoRed: 'Red',
    anoLime: 'Green',
    anoDarkBlue: 'Dark Blue',
    anoYellow: 'Yellow',
    anoPurple: 'Purple',
    anoOrange: 'Orange',
    anoLightBlue: 'Light Blue',
    reachBounds: 'The direction you selected has reached the boundary.',
    playStopped: 'Reached boundary.',
    play: 'Play',
    pause: 'Pause',
    preview: 'Preview',
    timingClosure: 'Timing Closure',
    keepOpen: 'Keep Open',
    cutPart: 'Capture',
    fullCut: 'Full Cut',
    oneKeyCut: 'Quick Cut',
    startSplit: 'Start SplitScreen',
    splitNotice: 'Please select 2-4 slides',
    splitNotice1: 'Please select ',
    splitNotice2: ' slides',
    splitNotice3: 'The relevant slides are less than ',
    splitNotice4: ', split-screen is not supported!',
    rangeDblClick: 'Dbl-click Range',
    numKeyMove: 'KeyMove Range',
    numKeyTime: 'KeyMove Speed',
    numZoomTime: 'Resize Speed',
    numAutoPlay: 'Auto-play Speed',
    backTo: 'Reset Position',
    navSize: 'Navigation Size',
    autoPlayDirection: 'Auto-play Default Direction',
    // 分屏浏览
    splitScreen: 'Split Screen',
    lockSlide: 'Lock Slides',
    // AI专用
    auxiliaryDiagnosis: 'Auxiliary Diagnosis',
    prostateDiagnosis: 'Diagnosis Assistant',
    aiAnalysis: 'AI Analysis Result',
    pathologistDiagnosis: 'Pathologist  Diagnosis',
    positive: 'Positive',
    negative: 'Negative',
    gleasonScore: 'Gleason Score',
    reset: 'Reset',
    submit: 'Submit',
    detectedArea: 'Detected Area',
    originPic: 'ORG',
    subSuccessfully: 'Successfully',
    aipLoading: 'Loading...',
    // lake
    lakeWM: 'Lake Diagnosis',
    lakeQD: 'Lake Reviewed',
    // 无权限页面
    noAuthMsg: 'Sorry, your account does not have permission to access this page...',
    noLoginMsg: 'Sorry, you haven\'t logged in...',
    noSelectMsg: 'You have not selected a slice to browse',
    quickLogin: 'Sign In',
    noLogin: 'Not Logged In',
    noAuth: 'No Access',
    noSelect: 'Not selected',
    // 扫码浏览
    qrCode: 'Scan Code',
    qrCodeOpen: 'Open Sharing',
    qrCodeOutside: 'Standing outside the share',
    qrCodeOnside: 'On Site Collaboration',
    qrCodeDes: 'Scanning code users can browse slices without logging in.',
    qrCodeDes1: 'Scan code users need to log in to access this slice, and can operate cooperatively.',
    qrCodeNotice: 'Please do not share QR code',
    // 标注改版
    colorPicker: 'ColorPicker',
    mutipleMode: 'Mutiple',
    colorChoose: 'ColorPicker',
    exportAnoList: 'Export',
    importAnoList: 'Import',
    importAnoList2: 'Import Annotations',
    importSuccess: 'Import successfully!',
    importError: 'Error Occured!',
    anoRemark: 'Remark',
    anoTypeUpdate: 'TypeUpdate',
    squareSize: 'Square Size',
    anoCategory: 'Category',
    all2: 'All',
    noticeSizeAno2: 'The area is too small at current rate!',
    noticeSizeAno3: 'The size of square should be between 10 and 100000!',
    chooseFile: 'Choose File',
    fileLimit: 'File Format: ndpa, xml, xls, xlsx. Maximum: 500KB',
    noAno: 'No Annotation to be exported!',
    // 切片列表
    prev: 'Prev',
    next: 'Next',
    // 镜下所见
    hpf: 'HPF',
    hpfShowStatus: 'Visible',
    hpfShowShape: 'Shape',
    hpfShowDiameter: 'Diameter',
    hpfCircle: 'Circle',
    hpfRect: 'Rect',
    hpfWarnEmpty: 'Please enter a number!',
    hpfWarnRange: 'The supported setting range is 0.1-2!',
    hpfWarnDecimalPlace: 'At most three decimal places!',
  },
} as const;