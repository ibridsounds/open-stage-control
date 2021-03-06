var osc = require('../../osc')

module.exports = class OscReceiver {

    constructor(address, value, parent, propName) {

        this.value = value
        this.parent = parent
        this.propName = propName
        this.bindedCallback = this.callback.bind(this)
        this.setAddress(address)

    }

    setAddress(address) {

        if (this.address !== address) {

            if (this.address) osc.off(this.address  + '.' + parent.hash, this.bindedCallback)

            this.address = address
            osc.on(this.address  + '.' + parent.hash, this.bindedCallback)

        }

    }

    callback(args) {

        if (typeof args !== 'object') args = [args]
        var preArgs = this.parent.getProp('preArgs') || []
        if (!isArray(preArgs) && preArgs !== '') preArgs = [preArgs]
        if (args.length >= preArgs.length) {
            for (var i in preArgs) {
                if (preArgs[i] !== args[i]) return
            }
            var val = args.slice(preArgs.length)
            if (val.length < 2) val = val[0]
            if (val !== this.value) {
                this.value = val
                this.parent.updateProps([this.propName], this.parent)
            }
        }

    }

}
