/**
 *@NApiVersion 2.0
 *@NScriptType ScheduledScript
 */
define(['N/search', 'N/record', 'N/email', 'N/runtime', 'N/log'],
    function (search, record, email, runtime, log) {
        function execute(scriptContext) {

            // Q2
            // {
            //     var mySearch = search.load({
            //         id: 'customsearch_atlas_total_custbased_rpt_2' // ID of the saved search of type customer
            //     });

            //     var countCustomers = mySearch.run().getRange({  // Retrieve a slice of the search result as an array of search.Result objects.
            //         start: 0,
            //         end: 10
            //     });

            //     for (var i = 0; i < countCustomers.length; i++) {
            //         log.debug('Email sent to ', countCustomers[i].getValue({
            //             name: 'email',
            //             label: 'Email'
            //         }));
            //         email.send({
            //             author: '-5', // internal id of the employee i.e. Kathryn Glass
            //             recipients: countCustomers[i].getValue({
            //                 name: 'email',
            //                 label: 'Email'
            //             }),
            //             subject: 'This is email subject',
            //             body: 'This is email body'
            //         });
            //     }

            //     log.debug('All emails sent successfully !!!');
            // }

            // Q3
            // {
            //     var paramValue = runtime.getCurrentScript().getParameter({
            //         name: 'custscript_param_email'
            //     }) 


            //     log.debug(paramValue)
            // }

            // Q4
            // {    
            //     email.send({
            //         author: -5,
            //         recipients: 'adam@gilchristpty.com',
            //         subject: 'Hy Adam',
            //         body: 'How are you?'
            //     })
            //     log.debug('Mail sent successfully')
            // }

            // Q5
            {
                var scriptObj = runtime.getCurrentScript();
                var deploymentId = scriptObj.deploymentId

                log.debug(deploymentId);

                switch (deploymentId) {
                    case 'customdeploy_deployment_memo1':
                        memo_msg = 'MEMO MESSAGE OF 1ST DEPL';
                        break;
                    case 'customdeploy_deployment_memo2':
                        memo_msg = 'MEMO MESSAGE OF 2ND DEPL';
                        break;
                    case 'customdeploy_deployment_memo3':
                        memo_msg = 'MEMO MESSAGE OF 3RD DEPL ';
                        break;
                    case 'customdeploy_deployment_memo4':
                        memo_msg = 'MEMO MESSAGE OF 4TH DEPL';
                        break;
                    default:
                        memo_msg = 'Unknown deployment';
                }

                var salesOrder = record.load({
                    type: record.Type.SALES_ORDER,
                    id: 22051 
                });

                salesOrder.setValue({
                    fieldId: 'memo',
                    value: memo_msg
                })
 
                salesOrder.save();
        
                log.debug('Memo field updated : ' + memo_msg);
            }
        }

        return {
            execute: execute
        };
    }
);