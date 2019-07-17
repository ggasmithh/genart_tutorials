
extern crate image;
extern crate imageproc;
extern crate rand;

use image::Rgb;
use imageproc::drawing::draw_line_segment_mut;
use rand::Rng;

let SIZE:u16 = 500;
let STEP:u8 = 20;

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

fn draw (&mut img, &mut context:Context, x:u16, y:u16, width:u16, height:u16) {
    let left_to_right:bool = rand::thread_rng().gen_range(0.0, 1.0) >= 0.5;

    

    if (left_to_right) {
        draw_line_segment_mut(&mut img, (context.current_x() as f32, context.current_y() as f32), ((context.current_x() + width) as f32, (context.current_y() + height) as f32), Rgb([0u8, 0u8, 0u8]));
        *context.current_x_mut() = u16::from(x + width);
        //*context.current_y_mut() = u16::from(y + height);
    } else{
    draw_line_segment_mut(&mut img, ((context.current_x() + width) as f32, context.current_y() as f32), (context.current_x() as f32, (context.current_y() + height) as f32), Rgb([0u8, 0u8, 0u8]));
        //*context.current_x_mut() = u16::from(x + width);
        // the above may be wrong, so i'm taking it out
        //*context.current_y_mut() = u16::from(y + height);
    }
    // putting this here to apply to all cases may also be wrong too
    *context.current_y_mut() = u16::from(y + height);

}

fn main() {
    // TODO: CREATE Image OBJECT

    // TODO: IMPLEMENT THIS:
    /* 
    for (var x = 0; x < size; x += step) {
        for (var y = 0; y < size; y += step) {
            draw(x, y, step, step);
        }
    }
    */
    img.save("output.png").unwrap();
}