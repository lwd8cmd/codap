/* global React */
/* global ReactDOM */
// sc_require('react/dg-react');

DG.React.ready(function () {
  var
      findDOMNode = ReactDOM.findDOMNode,
      span = React.DOM.span,
      input = React.DOM.input;

  DG.React.Components.TextInput = DG.React.createComponent(
      (function () {

        /**
         * props are
         *    value: {string | number}
         *    unit: {string}
         *    onToggleEditing: {function}
         */

        return {

          getInitialState: function () {
            return {
              editing: false,
              value: this.props.value,
              unit: this.props.unit
            };
          },

          componentDidMount: function () {
            DG.mainPage.mainPane.addListener({action: 'click', target: this, method: this._onWindowClick});
            DG.mainPage.mainPane.addListener({action: 'touchstart', target: this, method: this._onWindowClick});
          },
          componentWillUnmount: function () {
            DG.mainPage.mainPane.removeListener({action: 'click', target: this, method: this._onWindowClick});
            DG.mainPage.mainPane.removeListener({action: 'touchstart', target: this, method: this._onWindowClick});
          },

          componentWillReceiveProps: function (iNewProps) {
            if (iNewProps.value !== this.state.value)
              this.setState({value: iNewProps.value});
            if (iNewProps.unit !== this.state.unit)
              this.setState({unit: iNewProps.unit});
          },

          _onWindowClick: function (event) {
            var inputElement = findDOMNode(this);
            if (event.target !== inputElement && !inputElement.contains(event.target) && this.state.editing) {
              this.props.onToggleEditing(this);
            }
          },

          handleChange: function (iEvent) {
            this.setState({value: iEvent.target.value});
          },

          render: function () {
            var
                tUnits = SC.empty(this.state.value) ? '' : ' ' + (this.state.unit || ''),
                tValueClassName = this.props.isEditable ? 'react-data-card-value ' : '',
                tValue = SC.empty( this.state.value) ? '____' : this.state.value,
                tResult = this.state.editing ?
                    input({
                      className: 'dg-wants-mouse',
                      type: 'text',
                      value: this.state.value,
                      onChange: this.handleChange,
                      autoFocus: true,
                      onKeyDown: function (iEvent) {
                        if (iEvent.keyCode === 13) {
                          this.props.onToggleEditing(this);
                        }
                      }.bind(this)
                    }) :
                    span({
                      className: tValueClassName + this.props.className,
                      onDoubleClick: function () {
                        if (!this.state.editing && this.props.onToggleEditing && this.props.isEditable)
                          this.props.onToggleEditing(this);
                      }.bind(this)
                    }, tValue + tUnits);
            return tResult;
          }
        };
      }()), []);

});
