#**Google Analytics Reading Time**
Google Analytics Reading Time is a jQuery plugin for blogs and other content-driven sites that use [Google Analytics Event Tracking](https://developers.google.com/analytics/devguides/collection/analyticsjs/events) to tell Google Analytics how users actually interact with long-form content like blog posts or articles. Specifically, it tracks the following and sends this information to Google Analytics:

1. The number of users who start reading a post
2. The number of users who finish reading a post
3. How long each user to took to read a post

This plugin is particularly helpful if you want to see in Google Analytics how many users actually finish reading a post, what the average reading time is for a given post, and the percentage of users that finish reading a post.

##**Table of Contents**
<div class="toc"></div>

## **Dependencies**
You must have Google Analytics Universal set up on your site.
jQuery is required.

## **Setup**
To set up Google Analytics Reading Time simply include the Google_Analytics_Reading_Time.js script in your project.

To use Google Analytics Reading Time with default options, simply place the following lines of code inside a [$(document).ready function](https://learn.jquery.com/using-jquery-core/document-ready/):

    $('body’).GAReadingTime({});

This code sends an [Event](https://developers.google.com/analytics/devguides/collection/analyticsjs/events) with [Action](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventAction) name "start" every time a user comes to a post and another Event with Action name “finish” when the user scrolls to the bottom of a post. The [Event Value](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventValue) of the “finish” event is the time it took the user to read the post. Read below for more details.

## **Google Analytics Results**
With just the basic setup with default options shown above, you will see the following in Google Analytics.

To view the reading information go to your Google Analytics view and select Behavior, Events and Top Events like so:

 ![image alt text](image_0.png?raw=true)

With the default settings, the [Event Category](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventCategory) for all our reading time events will be "Content Viewing" so click on that category as shown in green above.

With the default setting the two [Event Actions](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventAction) are "start" and “finish”. By default the “start” event fires when the page finish loading and the “finish” action fires when the user scrolls to the bottom of the page. 

We can see in the Total Events columns of my Google Analytics screenshot below that the "start" event fired 99 times and the “finish” event fired 73 times. So we can say 99 users started reading one of my blog posts and 73 users finished.

![image alt text](readme_images/image_1.png?raw=true)

While the number of readers who start and finish posts is valuable, the real benefit of Google Analytics Reading Time is that we track how long it took users to finish reading a post. In the script, when the "finish" event fires it calculates the amount of time, in seconds, since the “start” event fired and sends this as the [Event Value](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventValue) to Google Analytics. So in the Google Analytics screenshot below the Avg. Value for the “finish” event is the average amount of time each user spent reading one of my blog posts.

![image alt text](readme_images/image_2.png?raw=true)

Now the above screenshot shows the average reading time for all my posts as 325.37 seconds or about 5 and half minutes. If I want to see the average reading time for each my blog posts individually, I can select the "Page Title" as the Secondary Dimension like so:

![image alt text](readme_images/image_3.png?raw=true)

Then I can see the average reading time for each blog post individually.

![image alt text](readme_images/image_4.png?raw=true)

These are only the most basic things you can do with Google Analytics once you add the Google Analytics Reading Time plugin to your site. If you want to get the most out of the plugin, we suggest making [Custom Reports](https://support.google.com/analytics/answer/1151300?hl=en).

## **Plugin Options**
<table>
  <tr>
    <td>Option</td>
    <td>Type</td>
    <td>Default Value</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>eventCategory</td>
    <td>String</td>
    <td>"Content Viewing"</td>
    <td>What the plugin sends as the eventCategory to Google Analytics</td>
  </tr>
  <tr>
    <td>eventStartAction</td>
    <td>String</td>
    <td>“start”</td>
    <td>What the plugin sends as the eventAction to Google Analytics for the “start” event</td>
  </tr>
  <tr>
    <td>eventFinishAction</td>
    <td>String</td>
    <td>“finish”</td>
    <td>What the plugin sends as the eventAction to Google Analytics for the “finish” event</td>
  </tr>
  <tr>
    <td>eventLabel</td>
    <td>String</td>
    <td>null</td>
    <td>What the plugin sends as the eventLabel to Google Analytics</td>
  </tr>
  <tr>
    <td>targetStart</td>
    <td>jQuery selector</td>
    <td>Whatever element the GAReadingTime code is attached to.</td>
    <td>The “start” event will fire whenever the top of the targetStart element enters the viewport.

In the default setup, the targetStart element is the ‘body’, so the “start” event will fire when the top of the body enters the viewport</td>
  </tr>
  <tr>
    <td>targetFinish</td>
    <td>jQuery selector</td>
    <td>Whatever element the GAReadingTime code is attached to.</td>
    <td>The “finish” event will fire whenever the bottom of the targetFinish element enters the viewport.

In the default setup, the targetFinish element is the ‘body’, so the “finish” event will fire when the bottom of the body enters the viewport</td>
  </tr>
</table>


##**Explanations of Options**
By default, the plugin sends the following [event fields](https://developers.google.com/analytics/devguides/collection/analyticsjs/events#event_fields) to Google Analytics

<table>
  <tr>
    <td>Option Name</td>
    <td>Google Analytics Event Field</td>
    <td>Default Value</td>
  </tr>
  <tr>
    <td>eventCategory</td>
    <td>eventCategory</td>
    <td>"Content Viewing"</td>
  </tr>
  <tr>
    <td>eventStartAction</td>
    <td>eventAction</td>
    <td>“start”</td>
  </tr>
  <tr>
    <td>eventFinishAction</td>
    <td>eventAction</td>
    <td>“finish”</td>
  </tr>
  <tr>
    <td>eventLabel</td>
    <td>eventLabel</td>
    <td>null</td>
  </tr>
  <tr>
    <td>No option</td>
    <td>eventValue</td>
    <td>-For the start event, the eventValue is the number of seconds between document.load and the start event firing
<br>-For the finish event, the eventValue is number of seconds between start event and the finish event, aka the reading time</td>
  </tr>
</table>


You can override any of the options above to customize what the plugin sends to Google Analytics. For instance, if I wanted to see the following in Google Analytics:

	Event Category = "Reading Time Info"
	Event Action - start = "start reading"
	Finish Action - finish = "finish reading"
	Event Label = "Blog Post"

You would change the setup code to the following

    $('body’).GAReadingTime({
	    eventCategory	:	"Reading Time Info",
	    eventStartAction	:	"start reading",
	    eventFinishAction	:	"finish reading",
	    eventLabel		:	"Blog Post",
    });
With the default setup, the plugin fires the "start" event whenever the top of the HTML body element eventers the viewport, usually after the page loads. It fires the “finish” event whenever the bottom of the HTML body tag enters the viewport, usually after the user has scrolled to the bottom of the page. However, these are not always the best places to fire the “start” and “finish” events. If that’s the case on your site, you have a number of options.

First, you could attach the GAReadingTime code to an element other than the HTML body tag. For instance, on my blog the content of each post is contained in a div block with the class "article_container" so I attach the GAReadingTime code this div block instead of the body tag like so:

![image alt text](readme_images/image_5.png?raw=true)

    $('.article_container').GAReadingTime({});

You can also make the "start" and “finish” events fire on separate elements. For instance, on my blog, I list a lot of references at the end of each post. Sometimes the references get quite long, so the user might not actually scroll to the bottom of the post’s container.

![image alt text](readme_images/image_6.png?raw=true)

So instead of waiting till the user scrolls to the end of my post’s container (*div.article_container* in my case) I make the event fire when the bottom of the *hr.end-bar* element enters the viewport by setting the option targetFinish = ‘.end-bar’

![image alt text](readme_images/image_7.png?raw=true)

By the same token, you can make the "start" event fire when the top of the post’s title enters the viewport by setting the option targetStart = ‘h2.article_title’

![image alt text](readme_images/image_8.png?raw=true)

Because I attach the GAReadingTime code to the *div.article_container* element and fire the "start" and “finish” events when the *h2.article_title* and *hr.end-bar* enter the viewports, respectively, I use change the set up code to the following:

    $('div.article_container').GAReadingTime({
	    targetStart		:	'h2.article_title',
	    targetFinish	:	'hr.end-bar',
	});

##**Helpful Tools**
Use the [Google Analytics Debugger Chrome Extension ](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna?utm_source=github.com/kmclaugh)to debug your plugin implementation. You can see how the plugin works on my site [countingcalculi.com ](http://countingcalculi.com/features/smart_hiring/?utm_source=github.com&utm_medium=Google_Analytics_Reading_Time_Instructions)by turning on the extension and reading the output in the Inspect Element console like so:

![image alt text](readme_images/image_9.png?raw=true)































1

