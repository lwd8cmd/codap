// ==========================================================================
//                      DG.LSRLAdornment
//
//  Author:   William Finzer
//
//  Copyright (c) 2016 by The Concord Consortium, Inc. All rights reserved.
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

sc_require('components/graph/adornments/twoD_line_adornment');
sc_require('components/graph/utilities/plot_utilities');

/** @class  Draws a least squares regression line.

  @extends DG.TwoDLineAdornment
*/
DG.LSRLAdornment = DG.TwoDLineAdornment.extend(
/** @scope DG.LSRLAdornment.prototype */ 
{
  defaultColor: DG.PlotUtilities.kDefaultLSRLColor,

  lineColor: function() {

    var getCellNamesArray = function() {
      var tCellMap = tLegendAttrDescription.getPath('attributeStats.cellMap'),
          tCellNamesArray = [];
      DG.ObjectMap.forEach( tCellMap, function( iKey, iValue) {
        tCellNamesArray.push( iKey);
      });
      return tCellNamesArray;
    }.bind( this);

    var tLegendAttrDescription = this.getPath('model.plotModel.dataConfiguration.legendAttributeDescription');
    if( tLegendAttrDescription.isNull() || tLegendAttrDescription.get('isNumeric')) {
      return sc_super();
    }
    var tNamesArray = getCellNamesArray(),
        tColor = DG.ColorUtilities.calcCaseColor(tNamesArray[ this.getPath( 'model.categoryIndex')],
                            tLegendAttrDescription).colorString;
    return tColor;
  }.property(),

  equationString: function() {
    var tResult = sc_super();
    if( !this.getPath('model.isInterceptLocked')) {
      var tFormat = DG.Format.number().fractionDigits(0, 3),
          tRSquared = this.getPath('model.rSquared'),
          tRSquaredString = SC.none(tRSquared) ? '' : tFormat(tRSquared);

      tResult = tResult + 'DG.ScatterPlotModel.rSquared'.loc(tRSquaredString) + this.get('sumResidSquaredString');
    }
    return tResult;
  }.property(),

  updateToModel: function() {
    this.positionEquationAndBackground();
  },

  enableMeasuresForSelectionDidChange:function() {
    this.get('model').setComputingNeeded();
    this.updateToModel();
  }

});

