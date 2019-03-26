package petfinder.site.test.functional;
import org.junit.jupiter.api.Test;
import petfinder.site.common.booking.BookingService;
import static org.junit.jupiter.api.Assertions.*;

public class EvaluationTest {
    BookingService bookingService = new BookingService();

    @Test
    void evaluate() throws Exception{
        String one = "2019-03-28T20:54:22.000Z";
        System.out.println(one.substring(0,10));
        bookingService.evaluate(one, "","","","","","","");
    }

}
