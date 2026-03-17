/**
 * @NApiVersion 2.1
 * @NScriptType Portlet
 */
define([],
    
    function () {
        /**
         * Defines the Portlet script trigger point.
         * @param {Object} params - The params parameter is a JavaScript object. It is automatically passed to the script entry
         *     point by NetSuite. The values for params are read-only.
         * @param {Portlet} params.portlet - The portlet object used for rendering
         * @param {string} params.column - Column index forthe portlet on the dashboard; left column (1), center column (2) or
         *     right column (3)
         * @param {string} params.entity - (For custom portlets only) references the customer ID for the selected customer
         * @since 2015.2
         */
        function render(params) {

        var portlet = params.portlet;
        portlet.title = "Company Announcements";

        var html = `
        <style>
            .dashboard-banner {
                background: linear-gradient(90deg,#0f4c81,#1c7ed6);
                color:white;
                padding:15px;
                border-radius:10px;
                font-family: Arial;
                display:flex;
                align-items:center;
                gap:15px;
            }

            .banner-logo img{
                width:60px;
            }

            .banner-content{
                flex-grow:1;
            }

            .greeting{
                font-size:18px;
                font-weight:bold;
            }

            .datetime{
                font-size:13px;
                opacity:0.9;
            }

            .quote{
                font-style:italic;
                margin-top:5px;
            }
        </style>

        <div class="dashboard-banner">
            
            <div class="banner-logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"/>
            </div>

            <div class="banner-content">
                <div class="greeting" id="greeting"></div>
                <div class="datetime" id="datetime"></div>
                <div class="quote">
                    "Success usually comes to those who are too busy to be looking for it."
                </div>
            </div>

        </div>

        <script>

            function updateGreeting(){
                var now = new Date();
                var hour = now.getHours();
                var greeting = "";

                if(hour < 12){
                    greeting = "Good Morning";
                }
                else if(hour < 18){
                    greeting = "Good Afternoon";
                }
                else{
                    greeting = "Good Evening";
                }

                document.getElementById("greeting").innerHTML =
                    greeting + ", welcome to the dashboard!";
            }

            function updateClock(){
                var now = new Date();
                document.getElementById("datetime").innerHTML =
                    now.toLocaleString();
            }

            updateGreeting();
            updateClock();

            setInterval(updateClock,1000);

        </script>
        `;

        portlet.html = html;
    }


        return {render}

    });
