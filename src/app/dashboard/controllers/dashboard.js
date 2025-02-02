/**
 * Controller for the dashboard route.
 * Render proper template.
 */
var dashboardTitle ;
(function () {
    'use strict';

    angular
        .module(HygieiaConfig.module)
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['dashboard', '$location', 'dashboardService', 'ScoreDisplayType','$scope'];
    function DashboardController(dashboard, $location, dashboardService, ScoreDisplayType,$scope) {
        var ctrl = this;
        //$scope.abc= "ello";
        // if dashboard isn't available through resolve it may have been deleted
        // so redirect to the home screen
        if (!dashboard) {
            $location.path('/');
        }

        // set the template and make sure it has access to the dashboard objec
        // dashboard is guaranteed by the resolve setting in the route

        // public variables
        var dashboardTemplate = dashboard.template.toLowerCase();
        if (dashboardTemplate == 'capone' || dashboardTemplate == 'product-dashboard' || dashboardTemplate == 'caponechatops' || dashboardTemplate == 'cloud' || dashboardTemplate == 'splitview' || dashboardTemplate == 'ms') {
            ctrl.templateUrl = 'components/templates/' + dashboardTemplate + '.html';
        }
        else if(dashboardTemplate == 'widgets') {
            ctrl.templateUrl = 'components/templates/widgetsTemplate.html';
        } else {
                ctrl.templateUrl = 'components/templates/customTemplate.html';
            }
            dashboard.title = dashboardService.getDashboardTitle(dashboard);
            //$scope.dashboardTitle = dashboardService.getDashboardTitle(dashboard);
        ctrl.dashboard = dashboard;
        //Add attributes for score
        ctrl.scoreEnabled = !!dashboard.scoreEnabled;
        ctrl.scoreHeaderEnabled = ctrl.scoreEnabled && (dashboard.scoreDisplay === ScoreDisplayType.HEADER);
        ctrl.scoreWidgetEnabled = ctrl.scoreEnabled && (dashboard.scoreDisplay === ScoreDisplayType.WIDGET);
       // HygieiaConfig.module.exports = dashboardTitle;
        //Default options to use with score display in header
        ctrl.scoreRateItOptionsHeader = {
            readOnly : true,
            step : 0.1,
            starWidth : 22,
            starHeight : 22,
            class : "score"
        };
  
        ;
        //Default options to use with score display in widget
        ctrl.scoreRateItOptionsWidget = {
            readOnly : true,
            step : 0.1,
            starWidth : 40,
            starHeight : 40,
            class : "score"
        };
        $scope.dashboardTitle = dashboard.application.name;
        console.log('Dashboard', dashboard);
    }
})();
