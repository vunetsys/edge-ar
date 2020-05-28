var ARController1asdasdasd = function (width, height, cameraPara) {
    this.id = undefined;
    var w = width,
        h = height;
    this.orientation = "landscape";
    this.listeners = {};
    if (typeof width !== "number") {
        var image = width;
        cameraPara = height;
        w = image.videoWidth || image.width;
        h = image.videoHeight || image.height;
        this.image = image
    }
    this.width = w;
    this.height = h;
    this.nftMarkerCount = 0;
    this.defaultMarkerWidth = 1;
    this.patternMarkers = {};
    this.barcodeMarkers = {};
    this.nftMarkers = {};
    this.transform_mat = new Float32Array(16);
    this.transformGL_RH = new Float64Array(16);
    if (typeof document !== "undefined") {
        this.canvas = document.createElement("canvas");
        this.canvas.width = w;
        this.canvas.height = h;
        this.ctx = this.canvas.getContext("2d")
    }
    this.videoWidth = w;
    this.videoHeight = h;
    this.videoSize = this.videoWidth * this.videoHeight;
    this.framepointer = null;
    this.framesize = null;
    this.dataHeap = null;
    this.videoLuma = null;
    this.camera_mat = null;
    this.marker_transform_mat = null;
    this.videoLumaPointer = null;
    this._bwpointer = undefined;
    this._lumaCtx = undefined;
    if (typeof cameraPara === "string") {
        this.cameraParam = new ARCameraParam(cameraPara, function () {
            this._initialize()
        }.bind(this), function (err) {
            console.error("ARController: Failed to load ARCameraParam", err);
            this.onload(err)
        }.bind(this))
    } else {
        this.cameraParam = cameraPara;
        this._initialize()
    }
};