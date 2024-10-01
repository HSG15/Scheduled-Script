/**
 * @NApiVersion 2.0
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget','N/log', 'N/task', 'N/runtime'],
    function(serverWidget, log, task, runtime) {
        function onRequest(scriptContext) {
            if(scriptContext.request.method == 'GET') {

                // Q4
                // { 
                //     var form = serverWidget.createForm({
                //         title: 'Triggering Scheduled Script through SuiteLet'
                //     })

                //     form.addSubmitButton({
                //         label: 'Submit'
                //     })
                // }

                // Q3
                {
                    var form = serverWidget.createForm({
                    title: 'Scheduled Script'
                    })

                    form.addField({
                        id: 'custpage_param',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Parameter'
                    })

                    form.addSubmitButton({
                        label: 'Submit'
                    })
                }


                scriptContext.response.writePage(form);

            }else{
                // Q4
                // {
                //     var schScriptTask = task.create({
                //     taskType: task.TaskType.SCHEDULED_SCRIPT,
                //     scriptId: 'customscript_sch_assignment_sendmail',
                //     deploymentId: 'customdeploy_test_d2'
                // })

                // var taskId = schScriptTask.submit()

                // log.debug('Scheduled script submitted' + taskId)
                // }

                // Q3
                {
                    var paramValue = scriptContext.request.parameters.custpage_param
                    var scheduleTask = task.create({
                        taskType: task.TaskType.SCHEDULED_SCRIPT,
                        scriptId: 'customscript_sch_assignment_sendmail',
                        deploymentId: 'customdeploy_test_d2'
                    })

                    scheduleTask.params = {
                        custscript_param_email: paramValue
                    }
                }

                var taskId = scheduleTask.submit()
                scriptContext.response.write('Schedule Script Submitted: ' + taskId)
                //log.debug('Scheduled script submitted' + taskId)  
            }
        }
        return {
            onRequest: onRequest
        }
    }
)