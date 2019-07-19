
extern crate image;
extern crate imageproc;
extern crate rand;

use image::Rgb;
use imageproc::drawing::draw_line_segment_mut;
use rand::Rng;

fn main() {
    let size = 500;
    let step = 20;
    let mut img = image::ImageBuffer::new(size, size);

    for (_, _, pixel) in img.enumerate_pixels_mut() {
        *pixel = image::Rgb([255u8, 255u8, 255u8])
    }

    for x in (0..size).step_by(step as usize) {
        for y in (0..size).step_by(step as usize) {
            let left_to_right:bool = rand::thread_rng().gen_range(0.0, 1.0) >= 0.5;

            if left_to_right {
                draw_line_segment_mut(&mut img, (x as f32, y as f32), ((x + step) as f32, (y + step) as f32), Rgb([0u8, 0u8, 0u8]));
            } else{
                draw_line_segment_mut(&mut img, ((x + step) as f32, y as f32), (x as f32, (y + step) as f32), Rgb([0u8, 0u8, 0u8]));
 
            }
        }
    }

    img.save("output.png").unwrap();
}