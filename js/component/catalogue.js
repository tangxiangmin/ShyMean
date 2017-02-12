/**
 * Created by admin on 2017/2/12.
 */

define([], function () {
    return {
        props:['data'],
        template:`<div class="catalogue">
            <ul v-for="h2 in data" class="catalogue_group">
            <li class="catalogue_item">
                <a href="#">{{h2.h2}}</a>
                <ul v-for="h3 in h2.h3" class="catalogue_group">
                    <li  class="catalogue_item">{{h3.h3}}
                        <ul class="catalogue_group">
                            <li v-for="h4 in h3.h4"  class="catalogue_item">{{h4}}</li>
                        </ul>
                    </li>
                </ul>
            </li>

        </ul></div>`,
    }
});