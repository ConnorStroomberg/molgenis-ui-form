## [4.0.3](https://github.com/molgenis/molgenis-ui-form/compare/v4.0.2...v4.0.3) (2019-09-23)


### Bug Fixes

* [#305](https://github.com/molgenis/molgenis-ui-form/issues/305) parse value prop on mount and prop change, indirect 2 way binding with value parsing inbetween ([2714b4f](https://github.com/molgenis/molgenis-ui-form/commit/2714b4f))
* CI build failure, set unsafe-perm to true to allow CI root user to build/release ([f77a9f6](https://github.com/molgenis/molgenis-ui-form/commit/f77a9f6))
* **dataFieldComponent:** add test for input value parser and improve validity check ([d9a4113](https://github.com/molgenis/molgenis-ui-form/commit/d9a4113))
* fix spelling errors ([7264141](https://github.com/molgenis/molgenis-ui-form/commit/7264141))
* fix unit test, make expected date dependent on location ([c67f1cc](https://github.com/molgenis/molgenis-ui-form/commit/c67f1cc))
* Move data formating from created to mounted to have it init the data on each mount ([86a4dae](https://github.com/molgenis/molgenis-ui-form/commit/86a4dae))
* transform internal date back to external format to avoid looping updates in two way binding. ([5247b6f](https://github.com/molgenis/molgenis-ui-form/commit/5247b6f))

## [4.0.2](https://github.com/molgenis/molgenis-ui-form/compare/v4.0.1...v4.0.2) (2019-05-31)


### Bug Fixes

* **Jenkinsfile:** fix indentation for Jenkinsfile ([963425f](https://github.com/molgenis/molgenis-ui-form/commit/963425f))
* **merge:** updated DataFieldComponent because of faulty merge ([4ea7220](https://github.com/molgenis/molgenis-ui-form/commit/4ea7220))
* **semantic-deps:** add plugins for auto release ([#303](https://github.com/molgenis/molgenis-ui-form/issues/303)) ([b6cefb1](https://github.com/molgenis/molgenis-ui-form/commit/b6cefb1))
* **today:** initialize other today's also with same syntax ([79940be](https://github.com/molgenis/molgenis-ui-form/commit/79940be))

<a name="4.0.1"></a>
## 4.0.1 (24-5-2019)

### Bugfixes
* [#299 Date(time) field clear button does not clear the value](https://github.com/molgenis/molgenis-ui-form/pull/300)

<a name="4.0.0"></a>
## 4.0.0 (2-5-2019)

### Breaking
* [#298 Gracefully handle evaluator errors](https://github.com/molgenis/molgenis-ui-form/pull/298)
Erroneous validation expressions in the `visibleExpression`, `nullableExpression` and `validationExpression`
will not stop execution of the scripts but instead fallback to a default value (see documentation) and continue with a warning.
### Features

### Bugfixes
* [#293 Null or undefined date string results in invalid parse attempt](https://github.com/molgenis/molgenis-ui-form/issues/293)

<a name="3.0.2"></a>
## 3.0.2 (25-04-2019)

### Bugfixes
* [#291 Cannot add new rows in molgenis for tables with mrefs](https://github.com/molgenis/molgenis-ui-form/issues/291)

<a name="3.0.1"></a>
## 3.0.1 (24-04-2019)

### Bugfixes
* [#267 Should enforce min and max long values](https://github.com/molgenis/molgenis-ui-form/issues/267)
* [#269 Should enforce max string lengths](https://github.com/molgenis/molgenis-ui-form/issues/269)
* [#274 Single select selection does not update form state](https://github.com/molgenis/molgenis-ui-form/issues/274)
* [#277 Cannot enter negative numbers](https://github.com/molgenis/molgenis-ui-form/issues/277)

<a name="3.0.0"></a>
## 3.0.0 (1-4-2019)
### Breaking changes
The mapper option `showNillableBooleanOption` is removed, the N/A option is now added to any radio
field whenever it is required. This takes the current value of a nullable expressions into account.

### Bugfixes
* [#260 Empty required file field does not invalidate the form](https://github.com/molgenis/molgenis-ui-form/issues/260)
* [#255 Auto generated dates not working](https://github.com/molgenis/molgenis-ui-form/issues/255)
* [#254 No way to figure out if radio button values have changed](https://github.com/molgenis/molgenis-ui-form/issues/254)

<a name="2.1.0"></a>
## 2.1.0 (19-11-2018)
### Features
* Rename boolean i18 message keys to avoid clash with molgenis project
   - `form_bool_true` renamed to `form_boolean_true`
   - `form_bool_false` renamed to `form_boolean_false`
   - `form_bool_missing` renamed to `form_boolean_missing`

### Bugfixes
* [#203 Hide all optional fields/show all fields not internationalized](https://github.com/molgenis/molgenis-ui-form/issues/203)
* [#233 Set the value to null on clearing a number field](https://github.com/molgenis/molgenis-ui-form/issues/233)
* [#226 Allow clearing of a date / date-time field](https://github.com/molgenis/molgenis-ui-form/issues/226)
* [#236 Age function is off by one year for future dates](https://github.com/molgenis/molgenis-ui-form/issues/236)
* [#242 Number input does not show validation errors if you enter text](https://github.com/molgenis/molgenis-ui-form/issues/242)
* [#245 Validation messages are in black](https://github.com/molgenis/molgenis-ui-form/issues/245)

<a name="1.2.0"></a>
## 1.2.1 (18-10-2018)
### Bugfixes
* [#220 Molgenis alternative data format is seen as invalid](https://github.com/molgenis/molgenis-ui-form/issues/220)

<a name="1.2.0"></a>
## 1.2.0 (17-10-2018)
### Features
* Feature/map default entity values when mapping in create mode
   
### Bugfixes
* [#201 Selecting File does not trigger vue-from change detect](https://github.com/molgenis/molgenis-ui-form/issues/201)
* [#211 When using Safari browser Molgenis datatime format result is empty date picker ](https://github.com/molgenis/molgenis-ui-form/issues/211)

<a name="1.1.0"></a>
## 1.1.0 (24-09-2018)
### Features
* No features package version was set incorrectly 
### Bugfixes
* Changelog release date is now set

<a name="1.0.0"></a>
## 1.0.0 (24-09-2018)
### Features
* Add validation support for integer, long and decimal
    * Extend field type with 'integer', 'long' and 'decimal' types
    * Remove 'number' type ( ***breaking change***)
    * Add support for mapping int, long and decimal to EntityMapper
* Update dev/demo/e2e-test setup, add page per feature to improve development, debugging and e2e-test experience 
* Add showNonVisibleAttributes option to EntityMapper options 
    * If set to true maps non visible attribute to visible field
    * showNonVisibleAttributes is optional and defaults to false
    * If visible expression is set this takes precedence 
* Add support for unique field validation
    * string, integer, long, decimal and radio fields support unique value validation
    * Molgenis entity mapper support creating isUnique function for form multi-value attributes 

### Bugfixes
* #166 Date-time cannot be processed by MOLGENIS
* #195 Date field emits date-time even if only date part is set 
* #189 Vulnerability vue-form depends on extend 3.0.1
* #185 Vue forms require you to fill in the id field when it's AUTO    
       

<a name="0.12.0"></a>
## 0.12.0 (13-09-2018)
* EntityMapper: Add entityMapper option to run entityMapper in "update" or 'create' mode.
    * In create mode readonly attributes map to editable fields to allow creating row.
    * By default the mapper is run in 'update' mode (ensures backwards compatibility).
* EntityMapper: Non visible, auto-value attributes are not mapped to from fields
    * These fields can not be read or written by the user and therefore not part of the form.
       

<a name="0.11.4"></a>
## 0.11.4 (02-08-2018)
* Updated peer dependency to remove warnings from build

<a name="0.11.2"></a>
## 0.11.2 (02-07-2018)
* Fix issue ,no options in mref not displayed correctly

<a name="0.11.1"></a>
## 0.11.1 (02-07-2018)
* localize datepicker

<a name="0.11.0"></a>
## 0.11.0 (28-06-2018)
* add debounce on input and textarea type

<a name="0.10.3"></a>
## 0.10.3 (02-05-2018)
* Fix issue 82, Multi select validation does not trigger on input  
* Debounce input update event ( default 500 ms), can be changed through settings ('inputDebounceTime')

<a name="0.10.2"></a>
## 0.10.2 (18-04-2018)
* Add 'mg-ui-form-field' to generated fields, this allows app css to target fields for styling. 

<a name="0.10.1"></a>
## 0.10.1 (16-04-2018)
* fix issue with multiple namespaces ( not working with ie11)

<a name="0.10.0"></a>

<a name="0.1.0"></a>
## 0.10.0 (13-04-2018)
* Make ability to add new option to select configurable 
* Update for use with multiple namespaces, form uses the 'ui-form' namespace 
* Fix select styling

<a name="0.9.12"></a>
## pre 0.10.0 (13-04-2018)
* Render html form with validation based on json object structure
* Molgenis entity to form-object mapper
