'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _parseInput = require('./utils/parseInput.js');

var _parseInput2 = _interopRequireDefault(_parseInput);

var _DayCell = require('./DayCell.js');

var _DayCell2 = _interopRequireDefault(_DayCell);

var _styles = require('./styles.js');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function checkRange(dayMoment, range) {
  return dayMoment.isBetween(range['startDate'], range['endDate']) || dayMoment.isBetween(range['endDate'], range['startDate']);
}

function checkStartEdge(dayMoment, range) {
  var startDate = range.startDate;


  return dayMoment.isSame(startDate);
}

function checkEndEdge(dayMoment, range) {
  var endDate = range.endDate;


  return dayMoment.isSame(endDate);
}

function isOusideMinMax(dayMoment, minDate, maxDate, format) {
  return minDate && dayMoment.isBefore((0, _parseInput2.default)(minDate, format)) || maxDate && dayMoment.isAfter((0, _parseInput2.default)(maxDate, format));
}

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props, context) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props, context));

    var format = props.format,
        range = props.range,
        theme = props.theme,
        offset = props.offset,
        firstDayOfWeek = props.firstDayOfWeek;


    var date = (0, _parseInput2.default)(props.date, format);
    var state = {
      date: date,
      shownDate: (range && range['endDate'] || date).clone().add(offset, 'months'),
      firstDayOfWeek: firstDayOfWeek || _moment2.default.localeData().firstDayOfWeek()
    };

    _this.state = state;
    _this.styles = (0, _styles2.default)(theme);
    return _this;
  }

  _createClass(Calendar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onInit = this.props.onInit;

      onInit && onInit(this.state.date);
    }
  }, {
    key: 'getShownDate',
    value: function getShownDate() {
      var _props = this.props,
          link = _props.link,
          offset = _props.offset;


      var shownDate = link ? link.clone().add(offset, 'months') : this.state.shownDate;

      return shownDate;
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(newDate) {
      var _props2 = this.props,
          link = _props2.link,
          onChange = _props2.onChange;
      var date = this.state.date;


      onChange && onChange(newDate, Calendar);

      if (!link) {
        this.setState({ date: newDate });
      }
    }
  }, {
    key: 'changeMonth',
    value: function changeMonth(direction, event) {
      event.preventDefault();
      var _props3 = this.props,
          link = _props3.link,
          linkCB = _props3.linkCB;


      if (link && linkCB) {
        return linkCB(direction);
      }

      var current = this.state.shownDate.month();
      var newMonth = this.state.shownDate.clone().add(direction, 'months');

      this.setState({
        shownDate: newMonth
      });
    }
  }, {
    key: 'renderMonthAndYear',
    value: function renderMonthAndYear(classes) {
      var shownDate = this.getShownDate();
      var year = shownDate.year();
      var styles = this.styles;
      var _props4 = this.props,
          onlyClasses = _props4.onlyClasses,
          monthsFormat = _props4.monthsFormat,
          leftButton = _props4.leftButton,
          rightButton = _props4.rightButton;

      var month = monthsFormat.length === 0 ? _moment2.default.months(shownDate.month()) : monthsFormat[shownDate.month()];

      return _react2.default.createElement(
        'div',
        { style: onlyClasses ? undefined : styles['MonthAndYear'], className: classes.monthAndYearWrapper },
        _react2.default.createElement(
          'button',
          {
            style: onlyClasses ? undefined : _extends({}, styles['MonthButton'], { float: 'left' }),
            className: classes.prevButton,
            onClick: this.changeMonth.bind(this, -1) },
          leftButton ? leftButton : _react2.default.createElement('i', { style: onlyClasses ? undefined : _extends({}, styles['MonthArrow'], styles['MonthArrowPrev']) })
        ),
        _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(
            'span',
            { className: classes.month },
            month
          ),
          _react2.default.createElement(
            'span',
            { className: classes.monthAndYearDivider },
            ' - '
          ),
          _react2.default.createElement(
            'span',
            { className: classes.year },
            year
          )
        ),
        _react2.default.createElement(
          'button',
          {
            style: onlyClasses ? undefined : _extends({}, styles['MonthButton'], { float: 'right' }),
            className: classes.nextButton,
            onClick: this.changeMonth.bind(this, +1) },
          rightButton ? rightButton : _react2.default.createElement('i', { style: onlyClasses ? undefined : _extends({}, styles['MonthArrow'], styles['MonthArrowNext']) })
        )
      );
    }
  }, {
    key: 'renderWeekdays',
    value: function renderWeekdays(classes) {
      var dow = this.state.firstDayOfWeek;
      var weekdays = [];
      var styles = this.styles;
      var _props5 = this.props,
          onlyClasses = _props5.onlyClasses,
          weekdaysFormat = _props5.weekdaysFormat;


      for (var i = dow; i < 7 + dow; i++) {
        var day = weekdaysFormat.length === 0 ? _moment2.default.weekdaysMin(i) : weekdaysFormat[i];

        weekdays.push(_react2.default.createElement(
          'span',
          { style: onlyClasses ? undefined : styles['Weekday'], className: classes.weekDay, key: i + day },
          day
        ));
      }

      return weekdays;
    }
  }, {
    key: 'renderDays',
    value: function renderDays(classes) {
      var _this2 = this;

      // TODO: Split this logic into smaller chunks
      var styles = this.styles;
      var _props6 = this.props,
          range = _props6.range,
          minDate = _props6.minDate,
          maxDate = _props6.maxDate,
          format = _props6.format,
          onlyClasses = _props6.onlyClasses;


      var shownDate = this.getShownDate();
      var _state = this.state,
          date = _state.date,
          firstDayOfWeek = _state.firstDayOfWeek;

      var dateUnix = date.unix();

      var monthNumber = shownDate.month();
      var dayCount = shownDate.daysInMonth();
      var startOfMonth = shownDate.clone().startOf('month').isoWeekday();

      var lastMonth = shownDate.clone().month(monthNumber - 1);
      var lastMonthNumber = lastMonth.month();
      var lastMonthDayCount = lastMonth.daysInMonth();

      var nextMonth = shownDate.clone().month(monthNumber + 1);
      var nextMonthNumber = nextMonth.month();

      var days = [];

      // Previous month's days
      var diff = Math.abs(firstDayOfWeek - (startOfMonth + 7)) % 7;
      for (var i = diff - 1; i >= 0; i--) {
        var dayMoment = lastMonth.clone().date(lastMonthDayCount - i);
        days.push({ dayMoment: dayMoment, isPassive: true });
      }

      // Current month's days
      for (var _i = 1; _i <= dayCount; _i++) {
        var _dayMoment = shownDate.clone().date(_i);
        days.push({ dayMoment: _dayMoment });
      }

      // Next month's days
      var remainingCells = 42 - days.length; // 42cells = 7days * 6rows
      for (var _i2 = 1; _i2 <= remainingCells; _i2++) {
        var _dayMoment2 = nextMonth.clone().date(_i2);
        days.push({ dayMoment: _dayMoment2, isPassive: true });
      }

      var today = (0, _moment2.default)().startOf('day');
      return days.map(function (data, index) {
        var dayMoment = data.dayMoment,
            isPassive = data.isPassive;

        var isSelected = !range && dayMoment.unix() === dateUnix;
        var isInRange = range && checkRange(dayMoment, range);
        var isStartEdge = range && checkStartEdge(dayMoment, range);
        var isEndEdge = range && checkEndEdge(dayMoment, range);
        var isEdge = isStartEdge || isEndEdge;
        var isToday = today.isSame(dayMoment);
        var isOutsideMinMax = isOusideMinMax(dayMoment, minDate, maxDate, format);

        return _react2.default.createElement(_DayCell2.default, _extends({
          onSelect: _this2.handleSelect.bind(_this2)
        }, data, {
          theme: styles,
          isStartEdge: isStartEdge,
          isEndEdge: isEndEdge,
          isSelected: isSelected || isEdge,
          isInRange: isInRange,
          isToday: isToday,
          key: index,
          isPassive: isPassive || isOutsideMinMax,
          onlyClasses: onlyClasses,
          classNames: classes
        }));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles;
      var _props7 = this.props,
          onlyClasses = _props7.onlyClasses,
          classNames = _props7.classNames;


      var classes = _extends({}, _styles.defaultClasses, classNames);

      return _react2.default.createElement(
        'div',
        { style: onlyClasses ? undefined : _extends({}, styles['Calendar'], this.props.style), className: classes.calendar },
        _react2.default.createElement(
          'div',
          { className: classes.monthAndYear },
          this.renderMonthAndYear(classes)
        ),
        _react2.default.createElement(
          'div',
          { className: classes.weekDays },
          this.renderWeekdays(classes)
        ),
        _react2.default.createElement(
          'div',
          { className: classes.days },
          this.renderDays(classes)
        )
      );
    }
  }]);

  return Calendar;
}(_react.Component);

Calendar.defaultProps = {
  leftButton: null,
  rightButton: null,
  monthsFormat: [],
  weekdaysFormat: [],
  format: 'DD/MM/YYYY',
  theme: {},
  onlyClasses: false,
  classNames: {}
};

Calendar.propTypes = {
  leftButton: _react.PropTypes.element,
  rightButton: _react.PropTypes.element,
  monthsFormat: _react.PropTypes.array,
  weekdaysFormat: _react.PropTypes.array,
  sets: _react.PropTypes.string,
  range: _react.PropTypes.shape({
    startDate: _react.PropTypes.object,
    endDate: _react.PropTypes.object
  }),
  minDate: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]),
  maxDate: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]),
  date: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string, _react.PropTypes.func]),
  format: _react.PropTypes.string.isRequired,
  firstDayOfWeek: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  onChange: _react.PropTypes.func,
  onInit: _react.PropTypes.func,
  link: _react.PropTypes.oneOfType([_react.PropTypes.shape({
    startDate: _react.PropTypes.object,
    endDate: _react.PropTypes.object
  }), _react.PropTypes.bool]),
  linkCB: _react.PropTypes.func,
  theme: _react.PropTypes.object,
  onlyClasses: _react.PropTypes.bool,
  classNames: _react.PropTypes.object
};

exports.default = Calendar;