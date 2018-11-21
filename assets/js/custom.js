(function ($, botChat) {
    var botName = "Sterva";

    $(document).ready(function () {
        var oldPanel = $(".wc-chatview-panel").draggable();

        makeResizeable(oldPanel);
        makeFocusable(oldPanel.find("input"));

        changeBotHeaderText(botName);

        var girlAvatar = $(".girl");
        var greetingPopup = $('[data-toggle="popover"]');

        girlAvatar.on("mouseenter", function () {
            this.src = "assets/images/agent-smile.png";
            greetingPopup.popover("show");
        });

        girlAvatar.on("mouseleave", function () {
            this.src = "assets/images/agent-ready.png";
            greetingPopup.popover("hide");
        });

        var bot = $("#bot");
        var loginOverlay = $("#login-overlay");

        $(".dropdown-menu").on("click", function (e) {
            e.stopPropagation();
        });

        var user = { id: "user-id", name: "" };

        $(".popup-btn").on("click", function (e) {
            if (!user || user.name === "") {
                bot.hide();
            }
        });

        $("form#login-form").on("submit", function (e) {
            e.preventDefault();

            $("span.loader").removeClass("hidden");

            user.id = $("input[name=MobileNumber]").val();
            user.name = $("input[name=CustomerName]").val();

            var botConnection = new botChat.DirectLine({
                token: "WPyRttpMzBA.cwA.E9o.YMWlIPTImSbpYzOzV2D3Qbu1Uu-YQBuSHQPtk4wHhZQ",
                user: user
            });

            botChat.App({
                user: user,
                botConnection: botConnection,
                bot: { id: "bot-id", name: botName },
                resize: "detect"
            },
                document.getElementById("bot"));

            botConnection.postActivity({
                from: user,
                name: "setUserIdEvent",
                type: "event",
                value: ""
            }).subscribe(function (id) {
                var newPanel = $(".wc-chatview-panel").draggable().css({
                    left: oldPanel[0].style.left,
                    top: oldPanel[0].style.top
                }).width(oldPanel.width());

                makeResizeable(newPanel);
                makeFocusable(newPanel.find("input"));

                changeBotHeaderText(botName);
                console.log('"trigger setUserIdEvent" sent');

                bot.show();
                loginOverlay.hide();
                $("span.loader").addClass("hidden");
            });
        });

        function changeBotHeaderText(botTitle) {
            $(".wc-header > span").text(botName);
        }

        function makeResizeable(element) {
            element.clayfy({
                type: "resizable",
                container: "html",
                minSize: [320, 420],
                maxSize: [800, 840]
            });
        }

        function makeFocusable(element) {
            element.on("click", function (e) {
                $(this).focus();
            });
        }
    });
})(jQuery, BotChat);