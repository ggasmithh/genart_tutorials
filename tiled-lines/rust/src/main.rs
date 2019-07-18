
extern crate image;
extern crate imageproc;
extern crate rand;

use image::Rgb;
use imageproc::drawing::draw_line_segment_mut;
use rand::Rng;

/*
struct Context {
    current_x:u16;
    current_y:u16;

}

// https://stackoverflow.com/questions/35390615/writing-getter-setter-properties-in-rust
impl Context {
    // Immutable access
    fn current_x(&self) -> &u16 {
        &self.current_x
    }

    fn current_y(&self) -> &u16 {
        &self.current_y
    }

    // Mutable access
    fn current_x_mut(&mut self) -> &mut u16 {
        &mut self.current_x
    }

    fn current_y_mut(&mut self) -> &mut u16 {
        &mut self.current_y
    }
}
*/


fn main() {
    let size: u32 = 500;
    let step: u8 = 20;
    let mut img = image::ImageBuffer::new(size, size);

    for (_, _, pixel) in img.enumerate_pixels_mut() {
        *pixel = image::Rgb([255u8, 255u8, 255u8])
    }

    for x in (0..size).step_by(step as usize) {
        for y in (0..size).step_by(step as usize) {
            let left_to_right:bool = rand::thread_rng().gen_range(0.0, 1.0) >= 0.5;

            if left_to_right {
                //draw_line_segment_mut(&mut img, (context.current_x() as f32, context.current_y() as f32), ((context.current_x() + width) as f32, (context.current_y() + height) as f32), Rgb([0u8, 0u8, 0u8]));
                draw_line_segment_mut(&mut img, (x as f32, y as f32), ((x + size) as f32, (y + size) as f32), Rgb([0u8, 0u8, 0u8]));
                //*context.current_x_mut() = u16::from(x + width);
                //*context.current_y_mut() = u16::from(y + height);
            } else{
                draw_line_segment_mut(&mut img, ((x + size) as f32, y as f32), (x as f32, (y + size) as f32), Rgb([0u8, 0u8, 0u8]));
                //*context.current_x_mut() = u16::from(x + width);
                // the above may be wrong, so i'm taking it out
                //*context.current_y_mut() = u16::from(y + height);
            }
        }
    }

    img.save("output.png").unwrap();
}