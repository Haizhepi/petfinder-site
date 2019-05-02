package petfinder.site.test.functional;
import org.junit.jupiter.api.Test;
import petfinder.site.common.user.sitter.SitterService;

import static org.junit.jupiter.api.Assertions.*;

import java.text.SimpleDateFormat;
import java.util.Date;
public class DistanceTest {
    SitterService sitterService = new SitterService();

    @Test
    void test() {
        Double tem = sitterService.calculateDistance(31.5493, 32.7767, -97.1467, -96.7970);
        System.out.println(tem);
    }

}
