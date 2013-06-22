loadit("Widget.TimelinePicker",function(){
Widget.TimelinePicker = Widget.Base.extend({
    initialize : function () {
        this.daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        this.monthsOfYear = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        this.dayNumbers = {
            "sunday": 0,
            "monday": 1,
            "tuesday": 2,
            "wednesday": 3,
            "thursday": 4,
            "friday": 5,
            "saturday": 6
        };
        this.HEX_MAP = {0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,a:10,b:11,c:12,d:13,e:14,f:15};
        this.events = [];
        this.isIE6 = (jQuery.browser.msie && jQuery.browser.version == "6.0");
        this.container = this.$el;
        this.date = new Date();
        this.placeHolders = this.setupPlaceHolders();
        this.container.addClass("timeline");
		    this.select_day = null;
        this.render();
    },
    render : function () {
        this.setupPrevious();
        var monthRepresentation = this.getMonthRepresentation();
		    var dairys_count = 0;
        
        this.placeHolders.bottom.find("td:gt(2)").removeClass("day has_diary_day weekend today").html("&nbsp;");
        
        for (var i = 0; i < monthRepresentation.length; i++){
          dairys_count += this.renderDay(this.placeHolders.bottom, monthRepresentation[i], 31-monthRepresentation.length) ? 1 : 0;
        }
        this.setupNext();
        this.setupCurrent();
		
		    if (this.cal_title) this.setupTitle(dairys_count);
    },
    renderDay : function (bottomRow, data, start) {
        var cssClass = "day";
        var has_dairy = false;
        
        if ((__calendar.length > Math.floor(data.day_number/4)) && this.HEX_MAP[__calendar.charAt(Math.floor(data.day_number/4))] & (8 >> (data.day_number % 4))) {
          cssClass += " has_diary_day";
          has_dairy = true;
        }
        if (data.wday == 0 || data.wday == 6){
          cssClass += " weekend";
        }
        
        var dateText = this.date.getFullYear()+'-'+this.monthsOfYear[this.date.getMonth()]+'-'+data.number;
        var numbEl = $("<a href=\"javascript:void(0)\" id='date_"+dateText+"'>" + data.number + "</a></li>");
        bottomRow.find(".date_td_"+(data.number_i+start)).html(numbEl).addClass(cssClass);
        
        var self = this;
        numbEl.bind("click", function() {
          App.trigger("messages_in_day",dateText);
  		    self.select_day = dateText;
          self.setupCurrent();
        });
        
        if (this.isToday(data.number)) {
          this.$(".date_tr_1 .date_td_"+(data.number_i+start)).addClass("today");
        }

		    return has_dairy;
    },
	  setupTitle: function(dairys_count) {
		  var dateString = this.date.getFullYear() + "年" + this.monthsOfYear[this.date.getMonth()] + "月";
      this.$(".date_tr_1 .date_td_-1").html(dateString);
		  this.cal_title.html("现在是"+dateString+"，本月有"+dairys_count+"天写了日记");
	  },
    setupCurrent: function() {
      this.$(".date_tr_0 .current").removeClass("current has_diary_day weekend today day");
      if (this.select_day && this.$("#date_"+this.select_day).size() > 0) {
        var td_class = this.$("#date_"+this.select_day).parent().attr("class");
        var td = this.$(".date_tr_0 ."+td_class.match(/date_td_\d+/));
        td.addClass(td_class+" current");
      }
    },
    setupPrevious : function(){
      // if (this.date.getMonth() == 0) {
      //   var dateString = this.date.getFullYear() - 1 + "年12月";
      // }else{
      //   var dateString = this.date.getFullYear() + "年" + this.monthsOfYear[this.date.getMonth() - 1] + "月";
      // }
      this.placeHolders.arrows_previous.html("<a class=\"timeline_lastmonth\" title=\"前一个月\" href='javascript:void(0)'>&nbsp;</a>");
      var children = this.placeHolders.arrows_previous.children();
      var self = this;
      $(children[0]).bind("click", this, function () {
          self.previousMonth();
      });
    },
    setupNext : function(){
      // if (this.date.getMonth() == 11) {
      //   var dateString = this.date.getFullYear() + 1 + "年01月";
      // }else{
      //   var dateString = this.date.getFullYear() + "年" + this.monthsOfYear[this.date.getMonth() + 1] + "月";
      // }
      this.placeHolders.arrows_next.html("<a class=\"timeline_nextmonth\" title=\"后一个月\" href='javascript:void(0)'>&nbsp;</a>");
      var children = this.placeHolders.arrows_next.children();
      var self = this;
      $(children[0]).bind("click", this, function () {
          self.nextMonth();
      });
    },
    setupPlaceHolders : function () {
        var tar = $("<table><tbody>"+
                      _([0,1]).map(function(i) {
                        return '<tr class="date_tr_'+i+'">'+
                               _(_.range(-2,32)).map(function(j) {
                                 return '<td class="date_td_'+j+'"></td>'
                               }).join("")+'</tr>';
                      }).join("")+"</tbody></table>");
                      
        this.$el.append(tar);
        return {
          arrows_previous: tar.find(".date_tr_1 .date_td_-2"),
          arrows_next: tar.find(".date_tr_1 .date_td_0"),
          bottom: tar.find(".date_tr_1")
        };
    },
    getMonthRepresentation : function () {
        var result = [];
        var numberOfDays = this.getNumberOfDaysInMonth(this.date);
        var firstDay = this.getFirstDayOfMonth(this.date);
        var month_start = ((new Date(this.date.getFullYear()+"/"+this.monthsOfYear[this.date.getMonth()]+"/1")) - (new Date("2011/3/15"))) / (24*60*60*1000);
        var finished = false;
        for (var i = 0; i < numberOfDays; i++) {
            result.push({
                name: this.weekDays[firstDay].substring(0, 1),
                number: (i + 1 < 10) ? "0" + (i + 1) : (i + 1),
                number_i: i+1,
                wday: firstDay,
                day_number: month_start + i
            });
            firstDay = (firstDay == 6) ? 0 : ++firstDay;
        }
        return result;
    },
    getNumberOfDaysInMonth : function (dateObject) {
        var month = dateObject.getMonth();
        if (month == 1) {
            var leapYear = (new Date(dateObject.getYear(), 1, 29).getDate()) == 29;
            if (leapYear) return 29
            else return 28;
        } else return this.daysPerMonth[month];
    },
    getFirstDayOfMonth : function (dateObject) {
        var save = dateObject.getDate();
        dateObject.setDate(1);
        var result = dateObject.getDay();
        dateObject.setDate(save);
        return result;
    },
    isToday : function (dayNumber) {
        var today = new Date();
        return (today.getDate() == dayNumber && today.getFullYear() == this.date.getFullYear() && today.getMonth() == this.date.getMonth());
    },
    nextMonth : function () {
        this.date.setMonth(this.date.getMonth() + 1);
        this.render();
    },
    nextYear : function () {
        this.date.setYear(this.date.getFullYear() + 1);
        this.render();
    },
    previousMonth : function () {
        this.date.setMonth(this.date.getMonth() - 1);
        this.render();
    },
    previousYear : function () {
        this.date.setYear(this.date.getFullYear() - 1);
        this.render();
    }
});
});//end of loadit