/**
 * angular-dialog-service - A service to handle common dialog types in a web application.  Built on top of Angular-Bootstrap's modal
 * @version v5.3.0
 * @author Michael Conroy, michael.e.conroy@gmail.com
 * @license MIT, http://www.opensource.org/licenses/MIT
 */
/**
 * Dialog Default Translations.
 *
 * Include this module if you're not already using angular-translate in your application, and
 * add it to your application module's dependency list in order to get default header and
 * dialog messages to appear.
 *
 * Ex: var myApp = angular.module('myApplication',['dialogs.main','dialogs.default-translations']);
 *
 * It was necessary to separate this out for those already using angular-translate because this would
 * automatically reset their translation list for 'en-US'
 *
 * For those already using angular-translate, just copy the list of DIALOG_[..] translations to your
 * translation list where you set 'en-US' using the $translateProvider.
 */

//== Translations =============================================================//

 angular.module('dialogs.default-translations',['pascalprecht.translate'])
 /**
     * Default translations in English.
     *
     * Use angular-translate's $translateProvider to provide translations in an
     * alternate language.
     *
     * $translateProvider.translations('[lang]',{[translations]});
     * To use alternate translations set the preferred language to your desired
     * language.
     * $translateProvider.preferredLanguage('[lang]');
     */
    .config(['$translateProvider',function($translateProvider){
        $translateProvider.translations('en-US',{
            DIALOGS_ERROR: "Lỗi",
            DIALOGS_ERROR_MSG: "Có lỗi xảy ra.",
            DIALOGS_CLOSE: "Đóng lại",
            DIALOGS_PLEASE_WAIT: "Vui lòng đợi",
            DIALOGS_PLEASE_WAIT_ELIPS: "Vui lòng đợi...",
            DIALOGS_PLEASE_WAIT_MSG: "Vui lòng đợi cho đến khi hoàn thành.",
            DIALOGS_PERCENT_COMPLETE: "% Hoàn thành",
            DIALOGS_NOTIFICATION: "Thông báo",
            DIALOGS_NOTIFICATION_MSG: "Unknown application notification.",
            DIALOGS_CONFIRMATION: "Xác nhận",
            DIALOGS_CONFIRMATION_MSG: "Confirmation required.",
            DIALOGS_OK: "Đồng ý",
            DIALOGS_YES: "Đồng ý",
            DIALOGS_NO: "Không"
        });
        $translateProvider.preferredLanguage('en-US');
    }]); // end config
