// ==========================================================================
//                            DG.TextView
//
//  Copyright (c) 2014 by The Concord Consortium, Inc. All rights reserved.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
// ==========================================================================

sc_require('views/text_field_view');

/** @class  DG.TextView

 A wrapper for a TextFieldView that gives user a place to type notes.

 @extends SC.View
 */
DG.TextView = SC.View.extend(
    /** @scope DG.TextView.prototype */ {

      backgroundColor: 'white',

      childViews: ['editView'],
      editView: DG.TextFieldView.design({
        layout: { left: 2, right: 2, top: 2, bottom: 2 },
        isEditable: true,
        isTextArea: true,
        maxLength: 32768,
        didCreateLayer: function() {
          sc_super();
          this._controller = this.getPath('parentView.parentView.parentView.controller');
        },
        commitEditing: function () {
          var result = sc_super();
          if (result) {
            this._controller.commitEditing();
          }
          return result;
        }
      }),

      defaultFirstResponder: function () {
        return this.get('editView');
      }.property(),

      /**
       * We've animated to our initial position and along the way lost editing focus.
       */
      didReachInitialPosition: function() {
        this.beginEditing();
      },

      beginEditing: function() {
        this.get('editView').beginEditing();
      }

    }
);
