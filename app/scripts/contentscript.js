'use strict';

$('.preferences-form').whenLive(function(el) {
  if ($('.fdplus-notifications-tabs').length > 0) {
    return;
  }
  var flows = fetchFlows();
  addNotificationTabs(flows);
  activateNotificationTabs();
});

function fetchFlows() {
  var flows = [];
  $('.flow-tab').each(function() {
    flows.push($(this).find('.tab-name').text().trim().toLowerCase());
  });
  return flows.sort();
}

function addNotificationTabs(flows) {
  $('#notification-preferences li:first-child').hide();
  $('#notification-preferences li:eq(1)').hide();

  flows.unshift('default');

  var flow;
  var tabContent = [];
  var tabs = [];
  for (var i = 0, len = flows.length; i < len; i++) {
    flow = flows[i];
    var tabOptions = buildTabOptions(flow);
    tabContent.push('<div class="fdplus-tab-content" data-fdplus-flow-name="' + flow + '">' + tabOptions + '</div>');
    tabs.push('<li data-fdplus-flow-name="' + flow + '"><a href="#">' + flow + '</a></li>')
  }

  tabContent = '<div class="fdplus-tab-content-wrapper">' + tabContent.join("") + '</div>';
  tabs = '<ul class="fdplus-tabs">' + tabs.join("") + '</ul>';
  var output = '<div class="fdplus-notifications-tabs">' + tabs + tabContent + '</div>';

  $('#notification-preferences .preferences-form').append(output);
}

function buildTabOptions(flow) {
  if (flow == "default") {
    var output = '<h4>By default, use the following settings:</h4>'
  } else {
    var output = '<h4>In the ' + flow + ' flow:</h4>';
    output += '<input checked="checked" class="fdplus-defaults-checkbox" type="checkbox" name="fdplus-use-defaults-' + flow + '">';
    output += '<label for="fdplus-use-defaults' + flow + '">Use the defaults</label>';
    output += '<div class="overrides">';
  }

  output += '<label>Show desktop notifications for:</label>';
  output += '<select name="fdplus-notifications-' + flow + '">';
  output += '<option value="all">all messages</option>';
  output += '<option value="mentions">mentions only</option>';
  output += '<option value="none">no messages</option>';
  output += '</select>';

  output += '<label>Play audio notifications on:</label>';
  output += '<select name="fdplus-audio-' + flow + '">';
  output += '<option value="all">all messages</option>';
  output += '<option value="mentions">mentions only</option>';
  output += '<option value="none">no messages</option>';
  output += '</select>';

  if (flow != "default") {
    output += '</div>';
  }

  return output;
}
function activateNotificationTabs() {
  $('.fdplus-notifications-tabs a').click(function(e) {
    e.preventDefault();
    var flow = $(this).parents('li').data('fdplus-flow-name');
    $('.fdplus-tabs li').removeClass('active');
    $(this).parents('li').addClass('active');
    var flowTab = $('.fdplus-tab-content[data-fdplus-flow-name=' + flow + ']');
    $('.fdplus-tab-content').hide();
    flowTab.show();
  });

  $('.fdplus-tabs li:first-child a').click();

  $('.fdplus-defaults-checkbox').click(function() {
    $(this).parents('.fdplus-tab-content').find('.overrides').toggle();
  });

  $('.overrides').hide();
}