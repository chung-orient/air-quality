/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
    config.language = 'vi';
    config.enterMode = CKEDITOR.ENTER_BR;
    config.toolbar = 'Full';
	// config.uiColor = '#AADC6E';
    config.filebrowserBrowseUrl = baseUrl+'/Scripts/ckfinder/ckfinder.html';
    config.filebrowserImageBrowseUrl = baseUrl +'/Scripts/ckfinder/ckfinder.html?Type=Images';
    config.filebrowserFlashBrowseUrl = baseUrl + '/Scripts/ckfinder/ckfinder.html?Type=Flash';
    config.filebrowserUploadUrl = baseUrl +'/Scripts/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Files';
    config.filebrowserImageUploadUrl = baseUrl + '/Scripts/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Images';
    config.filebrowserFlashUploadUrl = baseUrl + '/Scripts/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Flash';
};
