const mongoose = require('mongoose');

const {Schema} = mongoose;

const imageSchema = new Schema({

    abs_cal_factors: {type:Array, default:[]},
 'approximate_wavelengths': [661, 545, 477],
 'bounding_boxes': [{'ID': -1,
                     'box': [466, 299, 72, 60],
                     'category': 'fountain',
                     'crowd_rank': 0.662536,
                     'epsg': '4326',
                     'raw_category': 'Fountain',
                     'raw_location': 'POLYGON ((8.5829783604202152 '
                                     '47.4491842338692322, 8.5833139643901841 '
                                     '47.4491842338692322, 8.5833139643901841 '
                                     '47.4489085080230737, 8.5829783604202152 '
                                     '47.4489085080230737, 8.5829783604202152 '
                                     '47.4491842338692322))',
                     'spatial_reference': 'GCS_WGS_1984'},
                    {'ID': 47768,
                     'box': [466, 299, 72, 60],
                     'category': 'fountain',
                     'visible': 'True'}],
 'catalog_id': '105041000048BE00',
 'category': 'fountain',
 'cloud_cover': 0,
 'coordinates': '[8.583081799999999, 47.4490394778]',
 'country_code': 'CHE',
 'epsg': '4326',
 'geometry': {'coordinates': [[[8.58083601179, 47.4475160925],
                               [8.58532758821, 47.4475160925],
                               [8.58532758821, 47.4505628631],
                               [8.58083601179, 47.4505628631],
                               [8.58083601179, 47.4475160925]]],
              'type': 'Polygon'},
 'gsd': 0.468074887991,
 'image_url': 'https://spacenet-dataset.s3.amazonaws.com/Hosted-Datasets/fmow/fmow-rgb/train/fountain/fountain_514/fountain_514_1_msrgb.jpg',
 'img_filename': 'fountain_514_1_rgb.tif',
 'img_height': 663,
 'img_width': 977,
 'mean_pixel_height': 4.595430769222e-06,
 'mean_pixel_width': 4.597314657113e-06,
 'multi_resolution_dbl': 1.87378120422,
 'multi_resolution_end_dbl': 1.93471360207,
 'multi_resolution_max_dbl': 1.93471360207,
 'multi_resolution_min_dbl': 1.81178331375,
 'multi_resolution_start_dbl': 1.81178331375,
 'off_nadir_angle_dbl': 21.8978748322,
 'off_nadir_angle_end_dbl': 24.4030666351,
 'off_nadir_angle_max_dbl': 24.4030666351,
 'off_nadir_angle_min_dbl': 19.2567901611,
 'off_nadir_angle_start_dbl': 19.2567901611,
 'pan_resolution_dbl': 0.468074887991,
 'pan_resolution_end_dbl': 0.483204722404,
 'pan_resolution_max_dbl': 0.483204722404,
 'pan_resolution_min_dbl': 0.452661842108,
 'pan_resolution_start_dbl': 0.452661842108,
 'raw_location': 'POLYGON ((8.5808360117899998 47.447516092500003, '
                 '8.5853275882099993 47.447516092500003, 8.5853275882099993 '
                 '47.450562863099996, 8.5808360117899998 47.450562863099996, '
                 '8.5808360117899998 47.447516092500003))',
 'scan_direction': 'Reverse',
 'sensor_platform_name': 'GEOEYE01',
 'spatial_reference': 'GCS_WGS_1984',
 'sun_azimuth_dbl': 159.207946777,
 'sun_azimuth_max_dbl': 159.974273682,
 'sun_azimuth_min_dbl': 158.569869995,
 'sun_elevation_dbl': 46.1834640503,
 'sun_elevation_max_dbl': 46.3167991638,
 'sun_elevation_min_dbl': 46.0713729858,
 'target_azimuth_dbl': 31.2082061768,
 'target_azimuth_end_dbl': 21.684381485,
 'target_azimuth_max_dbl': 44.5366287231,
 'target_azimuth_min_dbl': 21.684381485,
 'target_azimuth_start_dbl': 44.5366287231,
 'timestamp': '2012-04-02T10:32:22Z',
 'utm': '32T'}

    year:{type:Number,default:0},
    title:{type:String, default:'N/A'},
    info:{
        directors:{type:Array, default:[]},
        release_date:{type:String, default:'N/A'},
        rating:{type:Number, default:0.0},
        genres:{type:Array, default:[]},
        image_url:{type:String, default:''},
        plot:{type:String, default:'N/A'},
        rank:{type:Number, default:0},
        running_time_secs:{type:Number, default:0},
        actors:{type:Array, default:[]}
        }
})

const moviesModel = mongoose.model('movies', movieSchema)

module.exports = moviesModel;