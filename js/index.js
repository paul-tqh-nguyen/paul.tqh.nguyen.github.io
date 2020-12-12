
/*******************/
/* Mobile Handling */
/*******************/

const isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/)); // TODO user agent matching is not ideal
if (isMobile) {
    $("#header-row").toggleClass("when-on-mobile");
    $("#header-text-block-title-text").toggleClass("when-on-mobile");
}

/*************/
/* Scrolling */
/*************/

$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
	    
	    var target = $(this.hash);
	    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	    if (target.length) {
		$('html,body').animate({
		    scrollTop: target.offset().top
		}, 1000);
		return false;
	    }
	}
	return false;
    });
});

/***************/
/* Sample Work */
/***************/

const isUndefined = value => value === void(0);

const uniqueArray = array => [...new Set(array)];
    
const createNewElement = (childTag, {classes, attributes, innerHTML}={}) => {
    const newElement = childTag === 'svg' ? document.createElementNS('http://www.w3.org/2000/svg', childTag) : document.createElement(childTag);
    if (!isUndefined(classes)) {
        classes.forEach(childClass => newElement.classList.add(childClass));
    }
    if (!isUndefined(attributes)) {
        Object.entries(attributes).forEach(([attributeName, attributeValue]) => {
            newElement.setAttribute(attributeName, attributeValue);
        });
    }
    if (!isUndefined(innerHTML)) {
        newElement.innerHTML = innerHTML;
    }
    return newElement;
};

const sampleWorkItemsDiv = document.querySelector('#sample-work-items');
const sampleWorkSelectorDiv = document.querySelector('#sample-work-selector');

const loadFileContentText = fileName => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', fileName, true);
        request.onreadystatechange = function() {
            if (this.readyState!==4) return;
            if (this.status!==200) return;
            resolve(this.responseText);
        };
        request.onerror = () => reject(request.statusText);
        request.send();
    });
};

{ // Load Sample Work Content

    const defaultLabel = 'Deep Learning';
    
    const sampleWorkFileNameToSampleWorkLabelsPairs = [
        ['sample_work_descriptions/get_food_nyc_dataset.html', ['All']],
        ['sample_work_descriptions/impact_of_attention.html', ['All', 'Deep Learning', 'NLP']],
        ['sample_work_descriptions/autograd.html', ['All', 'Deep Learning']],
        ['sample_work_descriptions/image_perforation.html', ['All', 'Image Processing']],
        ['sample_work_descriptions/google_reviews_transformers_comparison.html', ['All', 'Deep Learning', 'NLP']],
        ['sample_work_descriptions/reuters_topic_labelling.html', ['All', 'Deep Learning', 'NLP']],
        ['sample_work_descriptions/anime_recommendation_system_comparisons.html', ['All', 'Deep Learning', 'Recommender Systems']],
        ['sample_work_descriptions/facebook_friend_prediction.html', ['All', 'Deep Learning', 'Graph Analytics', 'Recommender Systems']],
        ['sample_work_descriptions/mutag_graph2vec_neural_classifier.html', ['All', 'Deep Learning', 'Graph Analytics']],
        ['sample_work_descriptions/joel_spolsky_text_generator.html', ['All', 'Deep Learning', 'NLP']],
        ['sample_work_descriptions/patch_match.html', ['All', 'Image Processing']],
        ['sample_work_descriptions/bilateral_filter.html', ['All', 'Image Processing']],
        ['sample_work_descriptions/canny_edge_detector.html', ['All', 'Image Processing']],
        ['sample_work_descriptions/arxiv_as_a_newspaper.html', ['All', 'UI/UX']],
        ['sample_work_descriptions/us_air_travel_visualization.html', ['All', 'Visualization (Interactive)']],
        ['sample_work_descriptions/caribou_location_tracking.html', ['All', 'Visualization (Interactive)']],
        ['sample_work_descriptions/netflix_2019_hashing_comparison.html', ['All', 'Graph Analytics', 'Visualization (Interactive)']],
        ['sample_work_descriptions/nyc_collision_map.html', ['All', 'UI/UX', 'Visualization (Interactive)']],
        ['sample_work_descriptions/stock_viewer.html', ['All', 'UI/UX', 'Visualization (Interactive)']],
        ['sample_work_descriptions/swing_dance_scores.html', ['All', 'UI/UX']],
    ];
    const sampleWorkFileNames = sampleWorkFileNameToSampleWorkLabelsPairs.map(pair => pair[0]);
    const sampleWorkLabelArrays = sampleWorkFileNameToSampleWorkLabelsPairs.map(pair => pair[1]);
    
    const fileContentPromises = sampleWorkFileNames.map(sampleWorkFileName => loadFileContentText(sampleWorkFileName));
    Promise.all(fileContentPromises).then(fileContentStrings => {
        fileContentStrings.forEach((sampleWorkInnerHTML, i) => {
            const sampleWorkItemDiv = createNewElement('div', {classes: ['sample-work-item'], innerHTML: sampleWorkInnerHTML});
            sampleWorkItemsDiv.append(sampleWorkItemDiv);
            const sampleWorkLabelArray = sampleWorkLabelArrays[i];
            sampleWorkLabelArray.forEach(sampleWorkLabel => {
                const sampleWorkLabelClass = `sample-work-item-${sampleWorkLabel.replace(/ /g, '')}`;
                sampleWorkItemDiv.classList.add(sampleWorkLabelClass);
            });
        });
        const sampleWorkTopicsDiv = document.querySelector('#sample-work-topics');
        const uniqueSampleWorkLabels = uniqueArray(sampleWorkLabelArrays.reduce((a,b) => a.concat(b), [])).filter(label => 'All' !== label).sort();
        uniqueSampleWorkLabels.unshift('All');
        uniqueSampleWorkLabels.forEach((sampleWorkLabel, i)  => {
            const sampleWorkLabelClass = `sample-work-item-${sampleWorkLabel.replace(/ /g, '')}`;
            const sampleWorkItemLink = createNewElement('div', {classes: ['sample-work-link'], innerHTML: sampleWorkLabel});
            sampleWorkItemLink.onclick = () => {
                const sampleWorkItems = sampleWorkItemsDiv.querySelectorAll('.sample-work-item');
                sampleWorkItems.forEach(sampleWorkItem => {
                    if (sampleWorkItem.classList.contains(sampleWorkLabelClass)) {
                        sampleWorkItem.classList.add('active');
                    } else {
                        sampleWorkItem.classList.remove('active');
                    }
                });
                sampleWorkTopicsDiv.querySelectorAll('.sample-work-link').forEach(otherSampleWorkItemLink => otherSampleWorkItemLink.classList.remove('active'));
                sampleWorkItemLink.classList.add('active');
            };
            if (sampleWorkLabel === defaultLabel) {
                sampleWorkItemLink.onclick();
            }
            sampleWorkTopicsDiv.append(sampleWorkItemLink);
        });
    }).catch(err => {
    	console.error(err.message);
    	return;
    });
    
}
