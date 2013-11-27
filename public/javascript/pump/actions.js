if (_.isObject(Pump) && _.isUndefined(Pump.Actions)){
    var Actions = Pump.Actions = new ActivityStreams.Actions();

    //Register action handlers
    var fooHandler = new ActivityStreams.ActionHandler('fooHandler');
    fooHandler.run = function(action, activity){
        alert("FooHandler has been triggered for action: " + action);
        console.log(activity);
    };
    Actions.registerActionHandler(fooHandler);
    Actions.registerActionHandler(new ActivityStreams.HttpActionHandler());
    Actions.registerActionHandler(new ActivityStreams.EmbedActionHandler());
    Actions.registerActionHandler(new ActivityStreams.IntentActionHandler());

    //Setup view render listener, ready is called after each view is rendered.
    var __oldReady = Pump.TemplateView.prototype.ready;
    Pump.TemplateView.prototype.ready = function(){
        __oldReady.apply(this, arguments);
        if(this.model && this.model.get("object")){
            var actions = Actions.getActionsWithHandlers(this.model.get("object"));
            _.each(actions, function(action){
                this.$('[data-action='+action+']').removeClass('hide');
            }, this);
        }
    };

}
